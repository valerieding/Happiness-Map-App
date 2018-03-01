from wtforms import IntegerField, FloatField, validators, StringField, SelectField

from constants import ALLOWED_REACTIONS_TO_POST
from server.util.sqlite_helpers import VoteAggregator

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


class ResultFilterForm:
    start_time = FloatField('start_time', default=0)
    end_time = FloatField('end_time', default=float('inf'))
    logical_location = StringField('logical_location', validators=[LOGICAL_LOCATION_VALIDATOR])


class PostIDForm:
    post_id = IntegerField('post_id', [validators.InputRequired()])


class ReactionForm:
    reaction = SelectField('reaction', [validators.InputRequired()],
                           choices=[(val, index) for index, val in enumerate(ALLOWED_REACTIONS_TO_POST)])


class AggregatorForm:
    AGGREGATORS = [(k, v) for k, v in VoteAggregator.AGGREGATORS.items()]
    group_by = SelectField('group_by', [validators.optional()], choices=AGGREGATORS, coerce=lambda x: x)
