from wtforms import Form

from server.util.forms import PostIDForm
from server.util.request_handler import RequestHandler


class RemovePostForm(Form, PostIDForm):
    """Validates the remove_post request form. """


class AdminRequests(RequestHandler):

    def __init__(self, messageAPI, user_manager):
        super().__init__(user_manager)
        self.messageAPI = messageAPI

    def remove_post(self, form, user_id):
        self.logger.info('ADMIN ACTION: user {} initiated a remove_post on {}'.format(user_id, form.post_id.data))
        self.messageAPI.remove_post(form.post_id.data)

    def get_routes(self):
        return [(self.remove_post, RemovePostForm)]
