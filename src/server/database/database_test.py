import unittest
from sqlite3 import IntegrityError
from tempfile import NamedTemporaryFile

from server import DatabaseManager


class DatabaseManagerTest(unittest.TestCase):
    EXPECTED_TABLE_NAMES = ['votes', 'posts', 'post_votes']

    def test_create(self):
        db = DatabaseManager(":memory:")
        table_names = [entry[1] for entry in db.execute("SELECT * FROM sqlite_master WHERE type='table'")]
        self.assertListEqual(table_names, DatabaseManagerTest.EXPECTED_TABLE_NAMES)

    def test_persistence(self):
        with NamedTemporaryFile() as file:
            filename = file.name
        db = DatabaseManager(filename)

        # At this point all tables should be empty
        for table_name in DatabaseManagerTest.EXPECTED_TABLE_NAMES:
            self.assertEqual(len(db.execute("SELECT * FROM %s" % table_name)), 0)

        db.execute("INSERT INTO votes VALUES (1, 2, 3, 4, NULL, NULL, NULL, NULL)")
        db.commit()
        del db

        # Now create new instance and see that the element persisted
        db = DatabaseManager(filename)
        self.assertCountEqual(db.execute("SELECT * FROM votes"), [(1, 2, 3, 4, None, None, None, None)])

    def test_bad_update(self):
        db = DatabaseManager(":memory:")
        with self.assertRaises(IntegrityError):
            # -1 is not a valid value for happiness_level
            db.execute("INSERT INTO votes VALUES (1, 2, 3, -1, NULL, NULL, NULL, NULL)")

    def test_locks(self):
        # TODO: write tests for the locking functionality
        pass


if __name__ == '__main__':
    unittest.main()
