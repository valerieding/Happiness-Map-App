import logging

from flask import Blueprint, request

from server import DATABASE_MANAGER
from server.database.voting_api import VotingAPI
from server.util.location import Location
from server.util.user import get_user_id, set_user_id
from server.voting.forms import *

voting_requests = Blueprint('queries', __name__)

votingAPI = VotingAPI(DATABASE_MANAGER)
logger = logging.getLogger('queries')


@voting_requests.route('/query/issue_user_id', methods=['POST'])
def issue_user_id():
    return set_user_id()


@voting_requests.route('/query/add_vote', methods=['POST'])
def add_vote():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = AddVoteForm(request.form)
    if form.validate() and votingAPI.add_vote(user_id, Location.from_request(form), form.happiness_level.data):
        return 'Success\n'
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@voting_requests.route('/query/get_campus_average')
def get_campus_average():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetCampusAverageForm(request.form)
    if form.validate():
        return str(votingAPI.get_campus_average(form.start_time.data, form.end_time.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'


@voting_requests.route('/query/get_building_average')
def get_building_average():
    user_id = get_user_id()
    logger.info("uid: {}, form = {}".format(user_id, request.form))

    form = GetBuildingAverageForm(request.form)
    if form.validate():
        return str(votingAPI.get_building_average(form.logical_location.data, form.start_time.data, form.end_time.data))
    logger.warning("uid: {}, form = {}: FAILURE (cause = {})".format(user_id, request.form, form.errors))
    return 'Invalid Request!\n'
