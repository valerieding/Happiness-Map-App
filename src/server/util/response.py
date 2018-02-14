from random import randint

from flask import request, jsonify


def _get_user_id():
    """Returns the user id as it is stored in the database or None if the request contains no user id. """
    user_id = request.cookies.get('user_id')
    return int(user_id) if user_id else None


def _issue_user_id():
    """Issues a new user ID. """
    # TODO: make this serial with a persistent atomic integer
    return randint(0, 2 ** 32)


def generate_response(FormValidator, response_generator, logger, requires_valid_user_id=False):
    """
    Validates the flask request form with `FormValidator` and returns 'Invalid request' if invalid or JSONifies the
    output of `response_generator`. If `requires_valid_uer_id` is set to True and a user_id cookie is not set, then it
    will generate a new user cookie.
    """
    form = FormValidator(request.form)

    kwargs = {'form': form}
    uid = _get_user_id()
    need_to_send_new_id = False
    if requires_valid_user_id:
        if uid is None:
            need_to_send_new_id = True
            uid = _issue_user_id()
        kwargs['user_id'] = uid

    request_form_rep = '{}{}'.format(FormValidator, list(request.form.items()))

    logger.info('User {} requested {}'.format(uid, request_form_rep))
    if not form.validate():
        logger.warning('Invalid request from user {}: {}'.format(uid, request_form_rep))
        return jsonify('Invalid request')

    response = jsonify(response_generator(**kwargs))
    if need_to_send_new_id:
        response.set_cookie('user_id', str(uid), expires=None)
    return response
