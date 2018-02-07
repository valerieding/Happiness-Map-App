import logging

from flask import Blueprint, request, make_response

from db.database import DatabaseManager
from db.location import Location
from db.message_api import MessageAPI
from db.voting_api import VotingAPI
from server.message_forms import *
from server.voting_forms import *
from src import DATABASE_FILE
from src import WEBSITE_ROOT_FOLDER

app = Blueprint('queries', __name__, static_folder=WEBSITE_ROOT_FOLDER)

db = DatabaseManager(DATABASE_FILE)
messageAPI = MessageAPI(db)
votingAPI = VotingAPI(db)
logger = logging.getLogger('queries')


def _get_user_id():
    """Returns the user id as it is stored in the database or None if the request contains no user id. """
    user_id = request.cookies.get('user_id')
    return int(user_id) if user_id else None


@app.route('/query/issue_user_id', methods=['POST'])
def issue_user_id():
    response = make_response()
    if _get_user_id() is None:
        # TODO: make the user ID generation serial and sign it with a secret key instead of doing this.
        response.set_cookie('user_id', str(votingAPI.issue_user_id()), expires=None)
    return response


@app.route('/query/add_vote', methods=['POST'])
def add_vote():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = AddVoteForm(request.form)
    if form.validate() and votingAPI.add_vote(user_id, Location.from_request(form), form.happiness_level.data):
        return 'Success\n'
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@app.route('/query/get_campus_average')
def get_campus_average():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetCampusAverageForm(request.form)
    if form.validate():
        return str(votingAPI.get_campus_average(form.start_time.data, form.end_time.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@app.route('/query/get_building_average')
def get_building_average():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetBuildingAverageForm(request.form)
    if form.validate():
        return str(votingAPI.get_building_average(form.logical_location.data, form.start_time.data, form.end_time.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@app.route('/query/get_recent_posts')
def get_recent_posts():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetRecentPostsForm(request.form)
    if form.validate():
        return str(messageAPI.get_recent_posts(Location.from_request(form), form.start_time.data, form.end_time.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@app.route('/query/get_trending_posts')
def get_trending_posts():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetTrendingPostsForm(request.form)
    if form.validate():
        return str(messageAPI.get_trending_posts(Location.from_request(form)))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@app.route('/query/get_posts')
def get_posts():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetPostsForm(request.form)
    if form.validate():
        return str(messageAPI.get_posts(None))  # TODO: implement this
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@app.route('/query/add_post')
def add_post():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = AddPostForm(request.form)
    if form.validate():
        return str(messageAPI.add_post(user_id, Location.from_request(form), form.reply_to.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@app.route('/query/upvote')
def upvote():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = UpvoteForm(request.form)
    if form.validate():
        return str(messageAPI.upvote(user_id, form.post_id.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@app.route('/query/downvote')
def downvote():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = DownvoteForm(request.form)
    if form.validate():
        return str(messageAPI.downvote(user_id, form.post_id.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


# @app.route('/query/remove_post') TODO: activate this with some sort of admin verification
def remove_post():
    user_id = _get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = RemovePostForm(request.form)
    if form.validate():
        return str(messageAPI.remove_post(form.post_id))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'
