import time
import unittest
from datetime import datetime

from server.database.database import DatabaseManager
from server.database.message_api_test import MockFilter
from server.database.voting_api import VotingAPI
from server.util.sqlite_helpers import VoteAggregator
from server.util.wrappers import Location

LOC_A = Location(1, 2, "A")
LOC_B = Location(2, 4, "B")

USERS_A = [(x, LOC_A, x) for x in range(5)]
USERS_B = [(x, LOC_B, 5) for x in range(5, 10)]


class VotingAPITest(unittest.TestCase):

    def setUp(self):
        self.votingApi = VotingAPI(DatabaseManager(":memory:"))

    def _populate(self, users):
        for user in users:
            self.votingApi.add_vote(*user)
            time.sleep(0.01)

    def test_add_vote_valid(self):
        for user in USERS_A + USERS_B:
            self.assertTrue(self.votingApi.add_vote(*user))
        self.assertEqual(self.votingApi.database.connection.total_changes, 11)

    def test_add_vote_disallow_multi_vote(self):
        self.votingApi.add_vote(1, LOC_A, 1)
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(), VoteAggregator()), 1)

        self.votingApi.add_vote(1, LOC_B, 5)  # This should remove the previous vote
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(), VoteAggregator()), 5)

    def test_add_vote_allow_old_multi_votes(self):
        self.votingApi.database.execute(
            "INSERT INTO votes VALUES  (4242, :uid, :time, :happiness_level, 0, 0, NULL, NULL)",
            {'uid': 1, 'time': 0, 'happiness_level': 1})
        self.votingApi.database.commit()

        self.votingApi.add_vote(1, LOC_A, 4)  # Should not remove the old vote.
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(), VoteAggregator()), 2.5)

    def test_add_vote_invalid(self):
        # Invalid requests because happiness_level has to be between 0 and 5.
        self.assertFalse(self.votingApi.add_vote(1, LOC_A, -2))
        self.assertFalse(self.votingApi.add_vote(1, LOC_B, 9))
        # 1 update to database: user ID generation
        self.assertEqual(self.votingApi.database.connection.total_changes, 1)

    def test_get_happiness_level(self):
        self.assertIsNone(self.votingApi.get_happiness_level(1))
        self._populate(USERS_A)
        self.assertEqual(self.votingApi.get_happiness_level(2), 2)

    def test_get_recent_votes(self):
        def recent_votes(**kwargs):
            return [(v.happiness_level, v.location) for v in self.votingApi.get_recent_votes(MockFilter(**kwargs))]

        self.assertListEqual(self.votingApi.get_recent_votes(MockFilter()), [])

        self._populate(USERS_A + USERS_B)
        loc = self.votingApi.database.execute("SELECT timestamp FROM votes WHERE uid = 3")[0][0]
        self.assertCountEqual(recent_votes(), [
            (0, LOC_A), (1, LOC_A), (2, LOC_A), (3, LOC_A), (4, LOC_A),
            (5, LOC_B), (5, LOC_B), (5, LOC_B), (5, LOC_B), (5, LOC_B)
        ])
        self.assertCountEqual(recent_votes(start_time=loc), [
            (3, LOC_A), (4, LOC_A),
            (5, LOC_B), (5, LOC_B), (5, LOC_B), (5, LOC_B), (5, LOC_B)
        ])
        self.assertCountEqual(recent_votes(end_time=loc - time.time()), [
            (0, LOC_A), (1, LOC_A), (2, LOC_A), (3, LOC_A)
        ])
        self.assertCountEqual(recent_votes(logical_loc="A"), [
            (0, LOC_A), (1, LOC_A), (2, LOC_A), (3, LOC_A), (4, LOC_A)
        ])

    def _populate_time_specific(self):
        def _add(user_id, score, dt):
            self.votingApi.database.execute(
                "INSERT INTO votes VALUES (NULL, ?, ?, ?, 45, 45, 'loc', 'addr')", (user_id, dt.timestamp(), score))
            self.votingApi.database.commit()

        _add(1, 1, datetime(2018, 1, 1))     # Monday,  12AM
        _add(1, 2, datetime(2018, 1, 2, 5))  # Tuesday,  5AM
        _add(1, 4, datetime(2018, 1, 1, 5))  # Monday,   5AM
        _add(2, 3, datetime(2018, 1, 2))     # Tuesday, 12AM

    def test_get_votes_by_location(self):
        self.assertIsNone(self.votingApi.get_votes_by(MockFilter(), VoteAggregator()))

        self._populate(USERS_A)
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(), VoteAggregator()), 2.0)
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(logical_loc='A'), VoteAggregator()), 2.0)
        self.assertIsNone(self.votingApi.get_votes_by(MockFilter(logical_loc='B'), VoteAggregator()))
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(), VoteAggregator('loc')), {'A': 2.0})

        self._populate(USERS_B)
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(), VoteAggregator()), 3.5)
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(logical_loc='A'), VoteAggregator()), 2.0)
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(logical_loc='B'), VoteAggregator()), 5)
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(), VoteAggregator('loc')), {'A': 2.0, 'B': 5.0})

    def test_get_votes_by_day_of_week(self):
        self.assertIsNone(self.votingApi.get_votes_by(MockFilter(), VoteAggregator()))

        self._populate_time_specific()
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(), VoteAggregator('dow')), {"Monday": 2.5, "Tuesday": 2.5})
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(uid=1), VoteAggregator('dow')), {"Monday": 2.5, "Tuesday": 2.0})
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(uid=2), VoteAggregator('dow')), {"Tuesday": 3.0})

    def test_get_votes_by_time_of_day(self):
        self.assertIsNone(self.votingApi.get_votes_by(MockFilter(), VoteAggregator()))

        self._populate_time_specific()
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(), VoteAggregator('tod')), {0: 2.0, 5: 3.0})
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(uid=1), VoteAggregator('tod')), {0: 1.0, 5: 3.0})
        self.assertEqual(self.votingApi.get_votes_by(MockFilter(uid=2), VoteAggregator('tod')), {0: 3.0})


if __name__ == '__main__':
    unittest.main()
