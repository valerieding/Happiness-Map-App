from wtforms import Form, validators, StringField

from server.util.forms import LocationForm, HappinessForm, ResultFilterForm, LOGICAL_LOCATION_VALIDATOR, AggregatorForm


class GetRecentVotesForm(Form, ResultFilterForm):
    """Validates the get_recent_votes request form. """


class GetVotesByForm(Form, ResultFilterForm, AggregatorForm):
    """Validates the get_votes_by and get_personal_votes_by request forms. """


class GetHappinessLevelForm(Form):
    """Validates the add_vote request form. """


class AddVoteForm(Form, LocationForm, HappinessForm):
    """Validates the add_vote request form. """


class GetHeatMapForm(Form, ResultFilterForm):
    """Validates the get_heatmap request form. """


class GetCampusAverageForm(Form, ResultFilterForm):
    """Validates the get_campus_average request form. """


class GetBuildingAverageForm(Form, ResultFilterForm):
    """Validates the get_building_average request form. """
    logical_location = StringField('logical_location', [validators.InputRequired(), LOGICAL_LOCATION_VALIDATOR])
