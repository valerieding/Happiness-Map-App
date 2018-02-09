from flask import request, jsonify

from server.util.user import get_user_id


class Location:

    def __init__(self, latitude, longitude, logical_location=None, address=None):
        self.latitude = latitude
        self.longitude = longitude
        self.logical_location = logical_location
        self.address = address

    @staticmethod
    def from_request(form):
        return Location(form.latitude.data, form.longitude.data, form.logical_location.data, form.address.data)

    @staticmethod
    def from_tuple(args):
        return Location(*args)


class Message:

    def __init__(self, post_id, parent_id, user_id, message, happiness_level, timestamp, location):
        self.post_id = post_id
        self.parent_id = parent_id
        self.user_id = user_id
        self.message = message
        self.happiness_level = happiness_level
        self.timestamp = timestamp
        self.location = location

    @staticmethod
    def from_tuple(args):
        return Message(args[0], args[2], args[3], args[4], args[5], args[8], Location.from_tuple(args[9:]))

    @staticmethod
    def from_tuple_array(array):
        return [Message.from_tuple(element) for element in array]


def validate_request(form, logger, requires_valid_user_id = False):
    """Validates a `form`, logs events in `logger` and returns an error message or None if the form is valid. """

    uid = get_user_id()
    request_form_rep = '{}{}'.format(form.__class__.__name__, list(request.form.items()))
    logger.info('User {} requested {}'.format(uid, request_form_rep))
    if not form.validate() or (uid is None and requires_valid_user_id):
        logger.warning('Invalid request from user {}: {}'.format(uid, request_form_rep))
        return jsonify('Invalid request')
    return None
