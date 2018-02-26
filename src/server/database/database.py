import sqlite3
from datetime import datetime
from random import randint
from threading import Lock

from constants import TABLE_TEMPLATE_FILE


class DatabaseManager:
    """
    Provides a thin wrapper around a simple SQLite database to streamline database queries and manage locks for
    multi-threaded use cases.
    """

    def __init__(self, database_file):
        self.connection = sqlite3.connect(database_file, check_same_thread=False)
        self.cursor = self.connection.cursor()
        self.master_lock = Lock()
        self.locks = {}
        with open(TABLE_TEMPLATE_FILE, 'r') as table_template:
            self.cursor.executescript(table_template.read())
        for method in DatabaseManager._get_sqlite_functions():
            self.connection.create_function(*method)

    def execute(self, command, *args):
        self.cursor.execute(command, *args)
        return self.cursor.fetchall()

    def commit(self):
        self.connection.commit()

    def issue_user_id(self):
        return randint(0, 2 ** 32)

    def acquire_lock(self, key):
        """Manages an array of locks. When this method is called, the lock corresponding to `key` is acquired."""
        if key in self.locks:
            self.locks[key].acquire()
            return
        self.master_lock.acquire()
        try:
            self.locks[key] = Lock()
            self.locks[key].acquire()
        finally:
            self.master_lock.release()

    def release_lock(self, key):
        """Manages an array of locks. When this method is called, the lock corresponding to `key` is released."""
        self.locks[key].release()

    def __del__(self):
        self.cursor.close()
        self.connection.close()

    @staticmethod
    def _get_sqlite_functions():
        def time_of_day(timestamp):
            """Returns the hour corresponding to this timestamp. Assumes Chicago Standard Time. """
            return datetime.fromtimestamp(int(timestamp)).hour

        def day_of_week(timestamp):
            return datetime.fromtimestamp(int(timestamp)).strftime('%A')

        for name, method in list(locals().items()):
            if callable(method):
                yield (name, 1, method)
