from random import randint

from flask import request, make_response


def get_user_id():
    """Returns the user id as it is stored in the database or None if the request contains no user id. """
    user_id = request.cookies.get('user_id')
    return int(user_id) if user_id else None


def issue_user_id():
    """Issues a new user ID. """
    # TODO: make this serial with a persistent atomic integer
    return randint(0, 2 ** 32)


def set_user_id():
    response = make_response()
    if get_user_id() is None:
        # TODO: sign the user ID with a secret key to avoid privacy issues
        response.set_cookie('user_id', str(issue_user_id()), expires=None)
    return response
