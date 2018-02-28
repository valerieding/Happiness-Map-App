import getpass
from tempfile import NamedTemporaryFile
from unittest import TestCase, mock

from server.database.database import DatabaseManager
from server.moderator.admin import AdminDatabaseManager, AdminManager
from server.util.cookie_manager import SignatureKey


class AdminTest(TestCase):

    @mock.patch.object(getpass, 'getpass', return_value='pass')
    def test_password_prompt(self, mocked):
        manager = AdminDatabaseManager(DatabaseManager(':memory:'), default_password=None)
        self.assertEqual(manager.prompt_for_password(), 'pass')
        self.assertEqual(mocked.call_count, 2)

    @mock.patch.object(getpass, 'getpass')
    def test_password_prompt_inconsistent(self, mocked):
        mocked.side_effect = ['password1', 'password2', 'pass', 'pass']
        manager = AdminDatabaseManager(DatabaseManager(':memory:'), default_password=None)
        self.assertEqual(manager.prompt_for_password(), 'pass')
        self.assertEqual(mocked.call_count, 4)

    def test_password_persistence(self):
        db = DatabaseManager(':memory:')
        manager = AdminDatabaseManager(db, default_password=None)
        self.assertIsNone(manager.get_credentials())
        manager.save_credentials('digest', 'salt')
        del manager

        manager = AdminDatabaseManager(db, default_password=None)
        self.assertEqual(manager.get_credentials(), ('digest', 'salt'))

    def test_admin_manager_persistence(self):
        with NamedTemporaryFile() as f:
            filename = f.name
        db = DatabaseManager(':memory:')
        manager = AdminManager(SignatureKey(filename), db, default_password='password')
        self.assertTrue(manager.authenticate('admin', 'password'))
        del manager

        manager = AdminManager(SignatureKey(filename), db, default_password=None)
        self.assertTrue(manager.authenticate('admin', 'password'))
