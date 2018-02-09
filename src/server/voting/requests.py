import logging

from flask import Blueprint, request, jsonify

from server import DATABASE_MANAGER
from server.database.voting_api import VotingAPI
from server.util import Location, validate_request
from server.util.user import get_user_id, set_user_id
from server.voting.forms import *

voting_requests = Blueprint('voting_requests', __name__)

votingAPI = VotingAPI(DATABASE_MANAGER)
logger = logging.getLogger('voting_requests')


@voting_requests.route('/request/issue_user_id', methods=['POST'])
def issue_user_id():
    return set_user_id()


@voting_requests.route('/request/add_vote', methods=['POST'])
def add_vote():
    form = AddVoteForm(request.form)
    error_response = validate_request(form, logger, requires_valid_user_id=True)
    if error_response is None:
        if votingAPI.add_vote(get_user_id(), Location.from_request(form), form.happiness_level.data):
            return jsonify('Success')
        return jsonify('Invalid request')
    return error_response


@voting_requests.route('/request/get_campus_average', methods=['POST'])
def get_campus_average():
    form = GetCampusAverageForm(request.form)
    return validate_request(form, logger) or jsonify(
        votingAPI.get_campus_average(form.start_time.data, form.end_time.data))


@voting_requests.route('/request/get_building_average', methods=['POST'])
def get_building_average():
    form = GetBuildingAverageForm(request.form)
    return validate_request(form, logger) or jsonify(
        votingAPI.get_building_average(form.logical_location.data, form.start_time.data, form.end_time.data))


@voting_requests.route('/request/get_heatmap', methods=['POST'])
def get_heat_map():
    form = GetHeatMapForm(request.form)
    return validate_request(form, logger) or jsonify(votingAPI.get_heat_map(form.start_time.data, form.end_time.data))
