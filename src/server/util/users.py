import pickle
from base64 import urlsafe_b64decode, urlsafe_b64encode
from os.path import isfile
from random import randint

from ecdsa import SigningKey, NIST256p


class UserManager:
    """
    Manages user IDs and signatures of them in cookies.
    """

    COOKIE_NAME = "user_id"

    def __init__(self, filename, db):
        if isfile(filename):
            with open(filename, 'rb') as f:
                self.sign_key = SigningKey.from_pem(f.read())
        else:
            self.sign_key = SigningKey.generate(curve=NIST256p)
            with open(filename, 'wb') as f:
                f.write(self.sign_key.to_pem())
        self.verify_key = self.sign_key.get_verifying_key()
        self.db = db

    @staticmethod
    def _encode(user_id, signature):
        return urlsafe_b64encode(pickle.dumps({'user_id': user_id, 'signature': signature})).decode('ascii')

    @staticmethod
    def _decode(cookie):
        if cookie is None:
            # User has no login cookie
            return None
        try:
            decoded = pickle.loads(urlsafe_b64decode(cookie.encode('ascii')), fix_imports=False)
        except:
            # `code` was altered. No user_id can be retrieved.
            return None
        if type(decoded) is not dict or set(decoded.keys()) != {'user_id', 'signature'}:
            return None
        return decoded

    def verify(self, signature, user_id):
        try:
            return self.verify_key.verify(signature, user_id)
        except AssertionError:
            # This happens if there is a length mismatch in the signature
            return False

    def new_user(self):
        """Returns a fresh user_id. """

        user_id = self.db.issue_user_id()
        signature = self.sign_key.sign(str(user_id).encode('ascii'))
        return user_id, (UserManager.COOKIE_NAME, UserManager._encode(user_id, signature))

    def get_user(self, cookies):
        cookie = UserManager._decode(cookies.get(UserManager.COOKIE_NAME))
        if cookie is None or not self.verify(cookie['signature'], str(cookie['user_id']).encode('ascii')):
            return None
        return cookie['user_id']
