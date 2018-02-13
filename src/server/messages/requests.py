import logging

from flask import Blueprint

from server import DATABASE_MANAGER
from server.database.message_api import MessageAPI
from server.messages.forms import *
from server.util import Location, generate_response
from server.util.user import get_user_id

message_requests = Blueprint('message_requests', __name__)

messageAPI = MessageAPI(DATABASE_MANAGER)
logger = logging.getLogger('messages_requests')


@message_requests.route('/request/get_recent_posts', methods=['POST'])
def get_recent_posts():
    def response(form):
        return messageAPI.get_recent_posts(Location.from_request(form), form.start_time.data, form.end_time.data)

    return generate_response(GetRecentPostsForm, response, logger)


@message_requests.route('/request/get_trending_posts', methods=['POST'])
def get_trending_posts():
    def response(form):
        return messageAPI.get_trending_posts(Location.from_request(form))

    return generate_response(GetTrendingPostsForm, response, logger)


@message_requests.route('/request/add_post', methods=['POST'])
def add_post():
    def response(form):
        return messageAPI.add_post(get_user_id(), Location.from_request(form), form.message.data, form.reply_to.data)

    return generate_response(AddPostForm, response, logger)


@message_requests.route('/request/upvote', methods=['POST'])
def upvote():
    def response(form):
        return messageAPI.upvote(get_user_id(), form.post_id.data)

    return generate_response(UpvoteForm, response, logger)


@message_requests.route('/request/downvote', methods=['POST'])
def downvote():
    def response(form):
        return messageAPI.downvote(get_user_id(), form.post_id.data)

    return generate_response(DownvoteForm, response, logger)


# TODO: activate this and have some sort of admin verification
'''
@message_requests.route('/request/remove_post', methods=['POST'])
def remove_post():
    form = RemovePostForm(request.form)
    return validate_request(form, logger) or jsonify(messageAPI.remove_post(form.post_id.data))
'''