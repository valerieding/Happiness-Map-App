from wtforms import Form, validators, StringField

from server.util.forms import LocationForm, HappinessForm, TimeIntervalForm, LOGICAL_LOCATION_VALIDATOR


class AddVoteForm(Form, LocationForm, HappinessForm):
    """Validates the add_vote request form. """


class GetHeatMapForm(Form):
    """Validates the get_heatmap request form. """
    # TODO: implement this


class GetCampusAverageForm(Form, TimeIntervalForm):
    """Validates the get_campus_average request form. """


class GetBuildingAverageForm(Form, TimeIntervalForm):
    """Validates the get_building_average request form. """
    logical_location = StringField('logical_location', [validators.InputRequired(), LOGICAL_LOCATION_VALIDATOR])
