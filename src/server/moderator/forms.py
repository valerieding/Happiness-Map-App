from wtforms import Form, StringField, validators, PasswordField

from server.util.generic_forms import PostIDForm


class RemovePostForm(Form, PostIDForm):
    """Validates the remove_post request form. """


class AdminLoginForm(Form):
    """Validates the admin login request form. """
    username = StringField('username', validators=[validators.InputRequired()])
    password = PasswordField('password', validators=[validators.InputRequired()])
