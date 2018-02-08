import logging

from flask import Blueprint, request

from server.database.message_api import MessageAPI
from server.messages.forms import *
from server.util.location import Location
from server.util.user import get_user_id
from server import DATABASE_MANAGER

message_requests = Blueprint('message_requests', __name__)

messageAPI = MessageAPI(DATABASE_MANAGER)
logger = logging.getLogger('messages_requests')


@message_requests.route('/request/get_recent_posts')
def get_recent_posts():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetRecentPostsForm(request.form)
    if form.validate():
        return str(messageAPI.get_recent_posts(Location.from_request(form), form.start_time.data, form.end_time.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@message_requests.route('/request/get_trending_posts')
def get_trending_posts():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetTrendingPostsForm(request.form)
    if form.validate():
        return str(messageAPI.get_trending_posts(Location.from_request(form)))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@message_requests.route('/request/get_posts')
def get_posts():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetPostsForm(request.form)
    if form.validate():
        return str(messageAPI.get_posts(None))  # TODO: implement this
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@message_requests.route('/request/add_post')
def add_post():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = AddPostForm(request.form)
    if form.validate():
        return str(messageAPI.add_post(user_id, Location.from_request(form), form.reply_to.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@message_requests.route('/request/upvote')
def upvote():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = UpvoteForm(request.form)
    if form.validate():
        return str(messageAPI.upvote(user_id, form.post_id.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@message_requests.route('/request/downvote')
def downvote():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = DownvoteForm(request.form)
    if form.validate():
        return str(messageAPI.downvote(user_id, form.post_id.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


# @app.route('/request/remove_post') TODO: activate this with some sort of admin verification
def remove_post():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = RemovePostForm(request.form)
    if form.validate():
        return str(messageAPI.remove_post(form.post_id.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'
