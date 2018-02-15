from constants import ALLOWED_REACTIONS_TO_POST


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

    def __repr__(self):
        return str(self.__dict__)


class Reactions:

    INT_TO_REACTION = ALLOWED_REACTIONS_TO_POST

    REACTION_TO_INT = {reaction: index for index, reaction in enumerate(INT_TO_REACTION)}

    def __init__(self, data):
        for reaction, count in zip(Reactions.INT_TO_REACTION, data):
            self.__setattr__(reaction, count)

    def __eq__(self, other):
        return isinstance(other, Reactions) and self.__dict__ == other.__dict__

    def __repr__(self):
        return str(self.__dict__)

    @staticmethod
    def get_reaction_id(reaction):
        return Reactions.REACTION_TO_INT.get(reaction)


class Message:
    def __init__(self, post_id, vote_id, parent_id, user_id, message, happiness_level, reactions, timestamp, location):
        self.post_id = post_id
        self.vote_id = vote_id
        self.parent_id = parent_id
        self.user_id = user_id
        self.message = message
        self.happiness_level = happiness_level
        self.reactions = reactions
        self.timestamp = timestamp
        self.location = location

    @staticmethod
    def from_tuple(args):
        return Message(post_id=args[0], vote_id=args[1], parent_id=args[2], user_id=args[3], message=args[4],
                       happiness_level=args[5], reactions=Reactions(args[6:8]), timestamp=args[8],
                       location=Location.from_tuple(args[9:]))

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

    def __repr__(self):
        return str(self.__dict__)
