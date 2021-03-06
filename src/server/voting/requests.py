from server.util.request_handler import RequestHandler
from server.util.sqlite_helpers import VoteAggregator, ResultFilter
from server.util.wrappers import Location
from server.voting.forms import *


class VotingRequests(RequestHandler):

    def __init__(self, votingAPI, request_manager):
        super().__init__(request_manager)
        self.votingAPI = votingAPI

    def get_recent_votes(self, form, user_id):
        return self.votingAPI.get_recent_votes(
            ResultFilter(form).add("uid", user_id).add("logical_loc", form.logical_location.data))

    def add_vote(self, form, user_id):
        self.votingAPI.add_vote(user_id, Location.from_request(form), form.happiness_level.data)
        return ''

    def get_votes_by(self, form):
        _filter = ResultFilter(form).add('logical_loc', form.logical_location.data)
        return self.votingAPI.get_votes_by(_filter, VoteAggregator(form.group_by.data))

    def get_personal_votes_by(self, form, user_id):
        _filter = ResultFilter(form).add('logical_loc', form.logical_location.data).add('uid', user_id)
        return self.votingAPI.get_votes_by(_filter, VoteAggregator(form.group_by.data))

    def get_happiness_level(self, form, user_id):
        return self.votingAPI.get_happiness_level(user_id)

    def get_routes(self):
        return [
            (self.get_recent_votes, GetRecentVotesForm),
            (self.add_vote, AddVoteForm),
            (self.get_happiness_level, GetHappinessLevelForm),
            (self.get_votes_by, GetVotesByForm),
            (self.get_personal_votes_by, GetVotesByForm),
        ]
