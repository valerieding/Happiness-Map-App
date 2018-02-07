from wtforms import IntegerField, FloatField, validators, StringField

"""
Defines several form stubs that should be used via inheritance by the end-user Form validators.
"""


class LocationForm:
    """Defines the validations required for a form that describes a location. """

    latitude = FloatField('latitude', [validators.InputRequired(), validators.NumberRange(min=-90, max=90)])
    longitude = FloatField('longitude', [validators.InputRequired(), validators.NumberRange(min=-180, max=180)])
    logical_location = StringField('logical_location', [validators.Regexp(r'[a-zA-Z0-9_]*')])
    address = StringField('address', [validators.Regexp(r'[a-zA-Z0-9 ,.-]*')])


class HappinessForm:
    """Defines the validations required for a form containing a happiness level. """

    happiness_level = IntegerField('happiness_level',
                                   [validators.InputRequired(), validators.NumberRange(min=0, max=5)])


class TimeIntervalForm:
    """Defines the validations required for a form containing a time interval. """

    start_time = FloatField('start_time', [validators.NumberRange(min=0)], default=0)
    end_time = FloatField('end_time', [validators.NumberRange(min=0)], default=float('inf'))


class PostIDForm:
    post_id = IntegerField('post_id', [validators.InputRequired()])
