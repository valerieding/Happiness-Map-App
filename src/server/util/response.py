import pickle
from base64 import urlsafe_b64decode, urlsafe_b64encode
from os.path import isfile
from pickle import PickleError
from random import randint

from ecdsa import SigningKey, NIST256p
from flask import request, jsonify

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


class _UserID:
    _SIGN_KEY = _get_sign_key()

    _VERIFY_KEY = _SIGN_KEY.get_verifying_key()

    def __init__(self, user_id, signature):
        self.user_id = user_id
        self.signature = signature

    def _validate(self):
        return _UserID._VERIFY_KEY.verify(self.signature, bytes(self.user_id))

    def save_cookie(self, response):
        response.set_cookie('user_id', urlsafe_b64encode(pickle.dumps(self.__dict__)).decode('ascii'))

    def __repr__(self):
        return repr(self.user_id)

    @staticmethod
    def issue():
        """Returns a fresh user_id. """

        # TODO: make this serial with a persistent atomic integer
        user_id = randint(0, 2 ** 32)
        return _UserID(user_id, _UserID._SIGN_KEY.sign(bytes(user_id)))

    @staticmethod
    def from_request():
        """Returns the `UserID` described by the `user_id` cookie or None if the cookie is missing or invalid. """

        data = _UserID._safely_get_dict(request.cookies.get('user_id'))
        if data is None:
            return None
        result = _UserID(user_id=data['user_id'], signature=data['signature'])
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


def generate_response(FormValidator, response_generator, logger, requires_valid_user_id=False):
    """
    Validates the flask request form with `FormValidator` and returns 'Invalid request' if invalid or JSONifies the
    output of `response_generator`. If `requires_valid_uer_id` is set to True and a user_id cookie is not set, then it
    will generate a new user cookie.
    """
    form = FormValidator(request.form)

    kwargs = {'form': form}
    user = _UserID.from_request()
    need_to_send_new_id = False
    if requires_valid_user_id:
        if user is None:
            need_to_send_new_id = True
            user = _UserID.issue()
        kwargs['user_id'] = user.user_id

    request_form_rep = '{}{}'.format(FormValidator.__name__, list(request.form.items()))

    logger.info('User {} requested {}'.format(user, request_form_rep))
    if not form.validate():
        logger.warning('Invalid request from user {}: {}'.format(user, request_form_rep))
        return jsonify('Invalid request')

    response = jsonify(response_generator(**kwargs))
    if need_to_send_new_id:
        user.save_cookie(response)
    return response
