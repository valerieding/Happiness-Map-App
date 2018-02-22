import pickle
from base64 import urlsafe_b64decode, urlsafe_b64encode
from os.path import isfile
from random import randint

from ecdsa import SigningKey, NIST256p

from constants import SIGNATURE_KEY_FILE


def _get_sign_key():
    """
    Returns the ECDSA key used to sign the user_id cookies. It loads it from `SIGNATURE_KEY_FILE` if it exists or
    generates one and stores it in `SIGNATURE_KEY_FILE`.
    """
    if isfile(SIGNATURE_KEY_FILE):
        with open(SIGNATURE_KEY_FILE, 'rb') as f:
            return SigningKey.from_pem(f.read())

    key = SigningKey.generate(curve=NIST256p)
    with open(SIGNATURE_KEY_FILE, 'wb') as f:
        f.write(key.to_pem())
    return key


class UserID:

    _SIGN_KEY = _get_sign_key()

    _VERIFY_KEY = _SIGN_KEY.get_verifying_key()

    def __init__(self, user_id, signature):
        self.user_id = user_id
        self.signature = signature

    def _validate(self):
        # TODO[SECURITY]: activate validation once it is no longer so expensive to validate
        return True  # _UserID._VERIFY_KEY.verify(self.signature, bytes(self.user_id))

    def save_cookie(self, response):
        response.set_cookie('user_id', urlsafe_b64encode(pickle.dumps(self.__dict__)).decode('ascii'))

    def __repr__(self):
        return repr(self.user_id)

    @staticmethod
    def issue():
        """Returns a fresh user_id. """

        # TODO[SECURITY]: activate validation once it is no longer so expensive to validate
        # TODO: make this serial with a persistent atomic integer
        user_id = randint(0, 2 ** 32)
        return UserID(user_id, "dummy key")  # UserID._SIGN_KEY.sign(bytes(user_id)))

    @staticmethod
    def from_cookie(cookies):
        """Returns the `UserID` described by the `user_id` cookie or None if the cookie is missing or invalid. """

        data = UserID._safely_get_dict(cookies.get('user_id'))
        if data is None:
            return None
        result = UserID(user_id=data['user_id'], signature=data['signature'])
        return result if result._validate() else None

    @staticmethod
    def _safely_get_dict(code):
        # TODO[SECURITY]: test behavior on maliciously generated cookies.

        if code is None:
            return None
        try:
            decoded = pickle.loads(urlsafe_b64decode(code.encode('ascii')), fix_imports=False)
        except Exception:
            # `code` was altered. No user_id can be retrieved.
            return None
        if type(decoded) is not dict or 'user_id' not in decoded or 'signature' not in decoded:
            return None
        return decoded
