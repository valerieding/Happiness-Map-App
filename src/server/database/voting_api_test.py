import time
import unittest

from server import DatabaseManager
from server.database.voting_api import VotingAPI
from server.util import Location, HeatMapPoint

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

    def test_add_vote_valid(self):
        for user in USERS_A + USERS_B:
            self.assertTrue(self.votingApi.add_vote(*user))
        self.assertEqual(self.votingApi.database.connection.total_changes, 10)

    def test_add_vote_disallow_multi_vote(self):
        self.votingApi.add_vote(1, LOC_A, 1)
        self.assertEqual(self.votingApi.get_campus_average(0, float('inf')), 1)

        self.votingApi.add_vote(1, LOC_B, 5)  # This should remove the previous vote
        self.assertEqual(self.votingApi.get_campus_average(0, float('inf')), 5)

    def test_add_vote_allow_old_multi_votes(self):
        self.votingApi.database.execute(
            "INSERT INTO votes VALUES  (4242, :uid, :time, :happiness_level, 0, 0, NULL, NULL)",
            {'uid': 1, 'time': 0, 'happiness_level': 1})
        self.votingApi.database.commit()

        self.votingApi.add_vote(1, LOC_A, 4)  # Should not remove the old vote.
        self.assertEqual(self.votingApi.get_campus_average(0, float('inf')), 2.5)

    def test_add_vote_invalid(self):
        # Invalid requests because happiness_level has to be between 0 and 5.
        self.assertFalse(self.votingApi.add_vote(1, LOC_A, -2))
        self.assertFalse(self.votingApi.add_vote(1, LOC_B, 9))
        # Ensure that no changes to the database occurred.
        self.assertEqual(self.votingApi.database.connection.total_changes, 0)

    def test_get_campus_average(self):
        # Empty list of votes => None
        self.assertIsNone(self.votingApi.get_campus_average(0, time.time()))

        self._populate(USERS_A)  # Average should be (0 + 1 + 2 + 3 + 4) / 5 = 2
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 2)

        self._populate(USERS_B)  # Average should be (0 + 1 + 2 + 3 + 4 + 5 * 5) / 10 = 3.5
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.5)

        # Interval with no people should still be None:
        self.assertIsNone(self.votingApi.get_campus_average(0, 1))

    def test_get_building_average(self):
        # Empty list of votes => None
        self.assertIsNone(self.votingApi.get_campus_average(0, time.time()))

        self._populate(USERS_A)  # Average should be (0 + 1 + 2 + 3 + 4) / 5 = 2
        self.assertEqual(self.votingApi.get_building_average(LOC_A.logical_location, 0, time.time()), 2)
        # LOC_B is still empty
        self.assertIsNone(self.votingApi.get_building_average(LOC_B.logical_location, 0, time.time()))

        self._populate(USERS_B)  # Average should be 5 since everyone has happiness_level = 5.
        self.assertEqual(self.votingApi.get_building_average(LOC_B.logical_location, 0, time.time()), 5)
        # LOC_A should remain unchanged
        self.assertEqual(self.votingApi.get_building_average(LOC_A.logical_location, 0, time.time()), 2)

        # Interval with no people should still be None:
        self.assertIsNone(self.votingApi.get_building_average(LOC_A.logical_location, 0, 1))

    def test_get_heatmap(self):
        # Empty list of votes => Empty heat_map list
        self.assertCountEqual(self.votingApi.get_heat_map(0, time.time()), [])

        self._populate(USERS_A)
        self.assertCountEqual(self.votingApi.get_heat_map(0, time.time()), [HeatMapPoint("A", 2)])

        self._populate(USERS_B)
        self.assertCountEqual(self.votingApi.get_heat_map(0, time.time()),
                              [HeatMapPoint("A", 2), HeatMapPoint("B", 5)])

    def test_get_happiness_level(self):
        self.assertIsNone(self.votingApi.get_happiness_level(1))
        self._populate(USERS_A)
        self.assertEqual(self.votingApi.get_happiness_level(1), 0)


if __name__ == '__main__':
    unittest.main()
