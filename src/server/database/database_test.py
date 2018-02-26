import unittest
from multiprocessing.pool import ThreadPool
from sqlite3 import IntegrityError
from tempfile import NamedTemporaryFile

from server.database.database import DatabaseManager


class DatabaseManagerTest(unittest.TestCase):
    EXPECTED_TABLES = ['votes', 'posts', 'post_votes', 'variables']

    def test_create(self):
        """
        Ensures that the DatabaseManager creates a database containing the `EXPECTED_TABLES` if the database does not
        already exist.
        """
        db = DatabaseManager(":memory:")
        table_names = [entry[1] for entry in db.execute("SELECT * FROM sqlite_master WHERE type='table'")]
        self.assertCountEqual(table_names, DatabaseManagerTest.EXPECTED_TABLES)

    def test_persistence(self):
        """Ensures that a database saved to file persists across DatabaseManager instances. """
        with NamedTemporaryFile() as file:
            # Doing this to get a unique temporary file name without actually creating that file.
            filename = file.name
        db = DatabaseManager(filename)

        # At this point all tables should be empty
        for table_name in DatabaseManagerTest.EXPECTED_TABLES:
            expected_size = 1 if table_name == 'variables' else 0
            self.assertEqual(len(db.execute("SELECT * FROM %s" % table_name)), expected_size)

        db.execute("INSERT INTO votes VALUES (1, 2, 3, 4, NULL, NULL, NULL, NULL)")
        db.commit()
        del db

        # Now create new instance and see that the element persisted
        db = DatabaseManager(filename)
        self.assertCountEqual(db.execute("SELECT * FROM votes"), [(1, 2, 3, 4, None, None, None, None)])

    def test_bad_update(self):
        """Ensures that invalid operations raise an IntegrityError. """
        db = DatabaseManager(":memory:")
        with self.assertRaises(IntegrityError):
            # -1 is not a valid value for happiness_level
            db.execute("INSERT INTO votes VALUES (1, 2, 3, -1, NULL, NULL, NULL, NULL)")

    @staticmethod
    def count_under_lock(count_per_thread, first_key, second_key):
        db = DatabaseManager(':memory:')
        shared_value = [0]

        def counter(lock_key):
            for _ in range(count_per_thread):
                db.acquire_lock(lock_key)
                shared_value[0] += 1
                db.release_lock(lock_key)

        ThreadPool(processes=2).map(counter, [first_key, second_key])
        return shared_value[0]

    def test_acquire_locks(self):
        """Ensures that threads acquiring locks with the same key results in mutual exclusion. """
        # If the count happened under a mutex, it should tally up correctly.
        self.assertEqual(self.count_under_lock(10000, "key", "key"), 20000)

    def test_independent_locks(self):
        """
        Ensures that threads acquiring locks with different keys does not result in mutual exclusion. This is tested
        by counting on the same non-atomic integer with two threads and making sure that a counting error happened.

        This test is flaky by its nature so it is run several times and check that the error happens at least once.
        """
        has_miscounted = False
        for _ in range(100):
            has_miscounted |= self.count_under_lock(10000, "key1", "key2") != 20000
            if has_miscounted:
                break
        self.assertTrue(has_miscounted)


if __name__ == '__main__':
    unittest.main()
