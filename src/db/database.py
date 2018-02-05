import os
import sqlite3
from threading import Lock


class DatabaseManager:
    """
    Provides a thin wrapper around a simple SQLite database to streamline database queries and manage locks for
    multi-threaded use cases.
    """

    TABLE_TEMPLATE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "table_templates.sql")

    def __init__(self, database_file):
        self.connection = sqlite3.connect(database_file)
        self.cursor = self.connection.cursor()
        self.master_lock = Lock()
        self.locks = {}
        with open(DatabaseManager.TABLE_TEMPLATE_FILE, 'r') as table_template:
            self.cursor.executescript(table_template.read())

    def execute(self, command, *args):
        self.cursor.execute(command, *args)
        return self.cursor.fetchall()

    def commit(self):
        self.connection.commit()

    def acquire_lock(self, key):
        """Manages an array of locks. When this method is called, the lock corresponding to `key` is acquired."""
        self.master_lock.acquire()
        try:
            if key not in self.locks:
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
