from wtforms import Form, IntegerField, FloatField, validators, StringField


class AddVoteForm(Form):
    uid = IntegerField('userID')
    # latitude = FloatField('latitude', [validators.NumberRange(min=-90.0, max=90.0)])
    # longitude = FloatField('longitude', [validators.NumberRange(min=-180.0, max=180.0)])
    logical_location = StringField('logical_location', [validators.Regexp(r'[a-zA-Z0-9_]*')])
    address = StringField('address', [validators.Regexp(r'[a-zA-Z0-9 ,.-]*')])
    happiness_level = IntegerField('happiness_level', [
        validators.NumberRange(min=0, max=5, message="Happiness level is an integer between 0 and 5")])


class GetHeatMapForm(Form):
    pass


class GetCampusAverageForm(Form):
    pass


class GetBuildingAverageForm(Form):
    pass
