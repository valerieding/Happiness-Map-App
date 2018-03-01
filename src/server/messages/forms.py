from wtforms import Form, validators, StringField, IntegerField

from server.util.generic_forms import PostIDForm, ReactionForm, ResultFilterForm


class GetRecentPostsForm(Form, ResultFilterForm):
    """Validates the get_recent_posts request form. """


class GetTrendingPostsForm(Form, ResultFilterForm):
    """Validates the get_trending_posts request form. """


class AddPostForm(Form):
    """Validates the add_posts request form. """
    reply_to = IntegerField('reply_to')
    message = StringField('message', [validators.InputRequired()])


class UpvoteForm(Form, PostIDForm):
    """Validates the upvote request form. """


class DownvoteForm(Form, PostIDForm):
    """Validates the downvote request form. """


class AddReactionForm(Form, PostIDForm, ReactionForm):
    """Validates the downvote request form. """
