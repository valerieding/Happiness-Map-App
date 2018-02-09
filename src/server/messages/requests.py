import logging

from flask import Blueprint, request, jsonify

from server import DATABASE_MANAGER
from server.database.message_api import MessageAPI
from server.messages.forms import *
from server.util.location import Location
from server.util.serve_request import validate_request
from server.util.user import get_user_id

message_requests = Blueprint('message_requests', __name__)

messageAPI = MessageAPI(DATABASE_MANAGER)
logger = logging.getLogger('messages_requests')


@message_requests.route('/request/get_recent_posts', methods=['POST'])
def get_recent_posts():
    form = GetRecentPostsForm(request.form)
    return validate_request(form, logger) or jsonify(
        messageAPI.get_recent_posts(Location.from_request(form), form.start_time.data, form.end_time.data))


@message_requests.route('/request/get_trending_posts', methods=['POST'])
def get_trending_posts():
    form = GetTrendingPostsForm(request.form)
    return validate_request(form, logger) or jsonify(
        messageAPI.get_trending_posts(Location.from_request(form)))


@message_requests.route('/request/get_posts', methods=['POST'])
def get_posts():
    form = GetPostsForm(request.form)
    return validate_request(form, logger) or jsonify(messageAPI.get_posts(None))  # TODO: implement this


@message_requests.route('/request/add_post', methods=['POST'])
def add_post():
    form = AddPostForm(request.form)
    return validate_request(form, logger) or jsonify(
        messageAPI.add_post(get_user_id(), Location.from_request(form), form.reply_to.data))


@message_requests.route('/request/upvote', methods=['POST'])
def upvote():
    form = UpvoteForm(request.form)
    return validate_request(form, logger) or jsonify(messageAPI.upvote(get_user_id(), form.post_id.data))


@message_requests.route('/request/downvote', methods=['POST'])
def downvote():
    form = DownvoteForm(request.form)
    return validate_request(form, logger) or jsonify(messageAPI.downvote(get_user_id(), form.post_id.data))


# @app.route('/request/remove_post', methods=['POST']) TODO: activate this with some sort of admin verification
def remove_post():
    form = RemovePostForm(request.form)
    return validate_request(form, logger) or jsonify(messageAPI.remove_post(form.post_id.data))
