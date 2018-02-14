import logging

from flask import Blueprint

from server import DATABASE_MANAGER
from server.database.voting_api import VotingAPI
from server.util import Location, generate_response
from server.voting.forms import *

voting_requests = Blueprint('voting_requests', __name__)

votingAPI = VotingAPI(DATABASE_MANAGER)
logger = logging.getLogger('voting_requests')


@voting_requests.route('/request/add_vote', methods=['POST'])
def add_vote():
    def response(form, user_id):
        if votingAPI.add_vote(user_id, Location.from_request(form), form.happiness_level.data):
            return 'Success'
        return 'Invalid request'

    return generate_response(AddVoteForm, response, logger, requires_valid_user_id=True)


@voting_requests.route('/request/get_campus_average', methods=['POST'])
def get_campus_average():
    def response(form):
        return votingAPI.get_campus_average(form.start_time.data, form.end_time.data)

    return generate_response(GetCampusAverageForm, response, logger)


@voting_requests.route('/request/get_building_average', methods=['POST'])
def get_building_average():
    def response(form):
        return votingAPI.get_building_average(form.logical_location.data, form.start_time.data, form.end_time.data)

    return generate_response(GetBuildingAverageForm, response, logger)


@voting_requests.route('/request/get_heatmap', methods=['POST'])
def get_heat_map():
    def response(form):
        return votingAPI.get_heat_map(form.start_time.data, form.end_time.data)

    return generate_response(GetHeatMapForm, response, logger)
