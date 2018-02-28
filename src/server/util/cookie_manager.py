import json
from base64 import urlsafe_b64encode, urlsafe_b64decode

import pickle

from ecdsa import SigningKey, NIST256p
from os.path import isfile


class SignatureKey:
    """Signs dictionaries. Serves as an authenticator for cookies. """

    def __init__(self, filename):
        if isfile(filename):
            with open(filename, 'rb') as f:
                self.sign_key = SigningKey.from_pem(f.read())
        else:
            self.sign_key = SigningKey.generate(curve=NIST256p)
            with open(filename, 'wb') as f:
                f.write(self.sign_key.to_pem())
        self.verify_key = self.sign_key.get_verifying_key()

    @staticmethod
    def _serialize(data):
        return json.dumps(data, sort_keys=True).encode('ascii')

    def encode(self, data):
        data['signature'] = self.sign_key.sign(SignatureKey._serialize(data))

    def decode(self, data):
        signature = data.get('signature')
        data.pop('signature', None)
        try:
            if signature is not None and self.verify_key.verify(signature, SignatureKey._serialize(data)):
                return data
        except Exception as e:
            pass
        return None


class CookieManager:

    def __init__(self, key, cookie_name, cookie_fields):
        self.key = key
        self.cookie_name = cookie_name
        self.cookie_fields = cookie_fields

    def encode(self, **cookie):
        assert set(cookie.keys()) == self.cookie_fields
        self.key.encode(cookie)
        return self.cookie_name, urlsafe_b64encode(pickle.dumps(cookie)).decode('ascii')

    def decode(self, cookie_jar):
        cookie = cookie_jar.get(self.cookie_name)
        if cookie is None:
            # User has no cookie
            return None
        try:
            decoded = pickle.loads(urlsafe_b64decode(cookie.encode('ascii')))
        except:
            # Cookie was altered. Reject it.
            return None
        if type(decoded) is not dict:
            return None
        decoded = self.key.decode(decoded)
        if decoded is None or set(decoded.keys()) != self.cookie_fields:
            return None
        return decoded

