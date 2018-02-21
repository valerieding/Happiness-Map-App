from wtforms import Form, validators, StringField

from server.util.forms import LocationForm, HappinessForm, TimeIntervalForm, ResultFilterForm, LOGICAL_LOCATION_VALIDATOR


class GetMostRecentVotesForm(Form, ResultFilterForm):
    """Validates the get_recent_votes request form. """


class GetHappinessLevelForm(Form):
    """Validates the add_vote request form. """


class AddVoteForm(Form, LocationForm, HappinessForm):
    """Validates the add_vote request form. """


class GetHeatMapForm(Form, TimeIntervalForm):
    """Validates the get_heatmap request form. """


class GetCampusAverageForm(Form, TimeIntervalForm):
    """Validates the get_campus_average request form. """


class GetBuildingAverageForm(Form, TimeIntervalForm):
    """Validates the get_building_average request form. """
    logical_location = StringField('logical_location', [validators.InputRequired(), LOGICAL_LOCATION_VALIDATOR])
