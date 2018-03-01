from server.messages.forms import *
from server.util.request_handler import RequestHandler
from server.util.sqlite_helpers import ResultFilter
from server.util.wrappers import Reactions


class MessageRequests(RequestHandler):

    def __init__(self, messageAPI, request_manager):
        super().__init__(request_manager)
        self.messageAPI = messageAPI

    def get_recent_posts(self, form):
        return self.messageAPI.get_recent_posts(ResultFilter(form).add("logical_loc", form.logical_location.data))

    def get_trending_posts(self, form):
        return self.messageAPI.get_trending_posts(ResultFilter(form).add("logical_loc", form.logical_location.data))

    def get_recent_personal_posts(self, form, user_id):
        result_filter = ResultFilter(form).add("uid", user_id).add("logical_loc", form.logical_location.data)
        return self.messageAPI.get_recent_posts(result_filter)

    def get_trending_personal_posts(self, form, user_id):
        result_filter = ResultFilter(form).add("uid", user_id).add("logical_loc", form.logical_location.data)
        return self.messageAPI.get_trending_posts(result_filter)

    def add_post(self, form, user_id):
        return self.messageAPI.add_post(user_id, form.message.data, form.reply_to.data)

    def add_reaction(self, form, user_id):
        return self.messageAPI.add_reaction(user_id, form.post_id.data, Reactions.get_reaction_id(form.reaction.data))

    def get_routes(self):
        return [
            (self.get_recent_posts, GetRecentPostsForm),
            (self.get_trending_posts, GetTrendingPostsForm),
            (self.get_recent_personal_posts, GetRecentPostsForm),
            (self.get_trending_personal_posts, GetTrendingPostsForm),
            (self.add_post, AddPostForm),
            (self.add_reaction, AddReactionForm),
        ]
