from wtforms import IntegerField, FloatField, validators, StringField, SelectField, BooleanField

from constants import ALLOWED_REACTIONS_TO_POST

"""
Defines several form stubs that should be used via inheritance by the end-user Form validators.
"""

LOGICAL_LOCATION_VALIDATOR = validators.Regexp(r'^[a-zA-Z0-9_]*$')

class LocationForm:
    """Defines the validations required for a form that describes a location. """

    latitude = FloatField('latitude', [validators.InputRequired(), validators.NumberRange(min=-90, max=90)])
    longitude = FloatField('longitude', [validators.InputRequired(), validators.NumberRange(min=-180, max=180)])
    logical_location = StringField('logical_location', [LOGICAL_LOCATION_VALIDATOR])
    address = StringField('address', [validators.Regexp(r'[a-zA-Z0-9 ,.-]*')])


class HappinessForm:
    """Defines the validations required for a form containing a happiness level. """

    happiness_level = IntegerField('happiness_level',
                                   [validators.InputRequired(), validators.NumberRange(min=0, max=5)])


class TimeIntervalForm:
    """Defines the validations required for a form containing a time interval. """

    start_time = FloatField('start_time', [validators.NumberRange(min=0)], default=0)
    end_time = FloatField('end_time', [validators.NumberRange(min=0)], default=float('inf'))
    # TODO: deprecate this in favor of ResultFilterForm


class ResultFilterForm:
    start_time = FloatField('start_time', default=0)
    end_time = FloatField('end_time', default=float('inf'))
    logical_location = StringField('logical_location', [LOGICAL_LOCATION_VALIDATOR])


class PostIDForm:
    post_id = IntegerField('post_id', [validators.InputRequired()])


class ReactionForm:

    ALLOWED_REACTIONS = [(val, index) for index, val in enumerate(ALLOWED_REACTIONS_TO_POST)]
    reaction = SelectField('reaction', [validators.InputRequired()], choices=ALLOWED_REACTIONS)

