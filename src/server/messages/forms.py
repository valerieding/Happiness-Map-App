from wtforms import Form, validators, StringField, IntegerField

from server.util.forms import LocationForm, PostIDForm, TimeIntervalForm, ReactionForm


class GetRecentPostsForm(Form, LocationForm, TimeIntervalForm):
    """Validates the get_recent_posts request form. """


class GetTrendingPostsForm(Form, LocationForm):
    """Validates the get_trending_posts request form. """


class AddPostForm(Form):
    """Validates the add_posts request form. """
    reply_to = IntegerField('reply_to')
    message = StringField('message', [validators.InputRequired()])
    # TODO: restrict message input?


class UpvoteForm(Form, PostIDForm):
    """Validates the upvote request form. """


class DownvoteForm(Form, PostIDForm):
    """Validates the downvote request form. """


class AddReactionForm(Form, PostIDForm, ReactionForm):
    """Validates the downvote request form. """


class RemovePostForm(Form, PostIDForm):
    """Validates the remove_post request form. """
