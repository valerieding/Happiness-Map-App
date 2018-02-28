import getpass
import hashlib
import os
import time

from server.util.cookie_manager import CookieManager


class AdminDatabaseManager:

    def __init__(self, db, default_password):
        self.db = db
        self.default_password = default_password

    def prompt_for_password(self, message='Admin password is not set or it is set incorrectly. Please set one now.'):
        if self.default_password is not None:
            return self.default_password
        attempt_1 = getpass.getpass('{}.\nSet admin password: '.format(message))
        attempt_2 = getpass.getpass("Type it again: ")
        if attempt_1 is None or attempt_1 != attempt_2:
            return self.prompt_for_password(message='Passwords do not match. Try again:')
        return attempt_1

    def get_credentials(self):
        result = self.db.execute('SELECT digest, salt FROM admin_credentials')
        return result[0] if len(result) == 1 else None

    def save_credentials(self, digest, salt):
        self.db.execute('DELETE FROM admin_credentials')
        self.db.execute('INSERT INTO admin_credentials VALUES (?, ?)', (digest, salt))
        self.db.commit()


class AdminManager:
    ADMIN_COOKIE_LIFETIME = 3600  # 1 hour

    PASSWORD_SALT_BYTES_SIZE = 64

    def __init__(self, key, db, default_password):
        self.cookie_manager = CookieManager(key, 'moderator', {'mod_id', 'expires'})
        credentials_manager = AdminDatabaseManager(db, default_password=default_password)
        admin_creds = credentials_manager.get_credentials()
        if admin_creds is None or len(admin_creds[1]) != AdminManager.PASSWORD_SALT_BYTES_SIZE:
            self.salt = os.urandom(AdminManager.PASSWORD_SALT_BYTES_SIZE)
            self.digest = self._get_digest(credentials_manager.prompt_for_password())
            credentials_manager.save_credentials(self.digest, self.salt)
        else:
            self.digest, self.salt = admin_creds

    def _get_digest(self, password):
        return hashlib.pbkdf2_hmac('sha256', password.encode('ascii'), self.salt, 100000)

    def authenticate(self, username, password):
        return username == 'admin' and self.digest == self._get_digest(password)

    def set_cookie(self, response):
        expires = time.time() + AdminManager.ADMIN_COOKIE_LIFETIME
        response.set_cookie(*self.cookie_manager.encode(mod_id='admin', expires=expires))

    def unset_cookie(self, response):
        response.set_cookie(self.cookie_manager.cookie_name, '', expires=0)

    @staticmethod
    def _validate_timestamp(timestamp):
        return type(timestamp) == float and time.time() <= timestamp

    def validate_cookie(self, cookie_jar):
        data = self.cookie_manager.decode(cookie_jar)
        if data is None or not AdminManager._validate_timestamp(data.get('expires')):
            return False
        return True
