from flask import request, jsonify

from server.util.user import get_user_id, issue_user_id


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

    def __eq__(self, other):
        """Returns true iff the objects are equal. This is meant primarily for testing. """
        return isinstance(other, Location) and self.__dict__ == other.__dict__


class Message:
    def __init__(self, post_id, vote_id, parent_id, user_id, message, happiness_level, timestamp, location):
        self.post_id = post_id
        self.vote_id = vote_id
        self.parent_id = parent_id
        self.user_id = user_id
        self.message = message
        self.happiness_level = happiness_level
        self.timestamp = timestamp
        self.location = location

    @staticmethod
    def from_tuple(args):
        return Message(post_id=args[0], vote_id=args[1], parent_id=args[2], user_id=args[3], message=args[4],
                       happiness_level=args[5], timestamp=args[8], location=Location.from_tuple(args[9:]))

    @staticmethod
    def from_tuple_array(array):
        return [Message.from_tuple(element) for element in array]

    def __eq__(self, other):
        """Returns true iff the objects are equal. This is meant primarily for testing. """
        return isinstance(other, Message) and self.__dict__ == other.__dict__

    def __repr__(self):
        return str(self.__dict__)


class HeatMapPoint:
    def __init__(self, logical_location, happiness_level):
        self.logical_location = logical_location
        self.happiness_level = happiness_level

    @staticmethod
    def from_tuple(args):
        return HeatMapPoint(*args)

    @staticmethod
    def from_tuple_array(array):
        return [HeatMapPoint.from_tuple(element) for element in array]

    def __eq__(self, other):
        """Returns true iff the objects are equal. This is meant primarily for testing. """
        return isinstance(other, HeatMapPoint) and self.__dict__ == other.__dict__


def generate_response(FormValidator, response_generator, logger, requires_valid_user_id=False):
    """
    Validates the flask request form with `FormValidator` and returns 'Invalid request' if invalid or JSONifies the
    output of `response_generator`. If `requires_valid_uer_id` is set to True then it may generate a user cookie if
    one does not exist.
    """
    form = FormValidator(request.form)

    kwargs = {'form': form}
    uid = get_user_id()
    need_to_send_new_id = False
    if requires_valid_user_id:
        if uid is None:
            need_to_send_new_id = True
            uid = issue_user_id()
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
