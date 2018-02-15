import logging

from flask import Blueprint

from server import DATABASE_MANAGER
from server.database.message_api import MessageAPI
from server.messages.forms import *
from server.util import Location, Reactions
from server.util.response import generate_response

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
    def response(form, user_id):
        return messageAPI.add_post(user_id, form.message.data, form.reply_to.data)

    return generate_response(AddPostForm, response, logger, requires_valid_user_id=True)


@message_requests.route('/request/add_reaction', methods=['POST'])
def add_reaction():
    def response(form, user_id):
        return messageAPI.add_reaction(user_id, form.post_id.data, Reactions.get_reaction_id(form.reaction.data))

    return generate_response(AddReactionForm, response, logger, requires_valid_user_id=True)


@message_requests.route('/request/upvote', methods=['POST'])
def upvote():
    def response(form, user_id):
        return messageAPI.add_reaction(user_id, form.post_id.data, Reactions.get_reaction_id('upvote'))

    return generate_response(UpvoteForm, response, logger, requires_valid_user_id=True)


@message_requests.route('/request/downvote', methods=['POST'])
def downvote():
    def response(form, user_id):
        return messageAPI.add_reaction(user_id, form.post_id.data, Reactions.get_reaction_id('downvote'))

    return generate_response(DownvoteForm, response, logger, requires_valid_user_id=True)


# TODO: activate this and have some sort of admin verification
'''
@message_requests.route('/request/remove_post', methods=['POST'])
def remove_post():
    form = RemovePostForm(request.form)
    return validate_request(form, logger) or jsonify(messageAPI.remove_post(form.post_id.data))
'''