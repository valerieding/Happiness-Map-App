from flask import request, jsonify

from server.util.user import get_user_id


def validate_request(form, logger):
    """Validates a `form`, logs events in `logger` and returns an error message or None if the form is valid. """

    uid = get_user_id()
    request_form_rep = '{}{}'.format(form.__class__.__name__, list(request.form.items()))
    logger.info('User {} requested {}'.format(uid, request_form_rep))
    if not form.validate():
        logger.warn('Invalid request from user {}: {}'.format(uid, request_form_rep))
        return jsonify('Invalid request')
    return None
