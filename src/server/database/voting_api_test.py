import time
import unittest

from server import DatabaseManager
from server.database.voting_api import VotingAPI
from server.util.location import Location


class VotingApiTest(unittest.TestCase):
    loc1 = Location(1, 2, "Location1", "Address1")
    loc2 = Location(2, 4, "Location2", "Address2")

    def setUp(self):
        self.votingApi = VotingAPI(DatabaseManager(":memory:"))

    def test_add_vote(self):
        # Adding three votes to Location 1: 3, 1, 5
        self.assertTrue(self.votingApi.add_vote(1, self.loc1, 3))
        self.assertEqual(self.votingApi.get_building_average("Location1", 0, time.time()), 3.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.0)
        self.assertTrue(self.votingApi.add_vote(1, self.loc1, 1))
        self.assertEqual(self.votingApi.get_building_average("Location1", 0, time.time()), 2.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 2.0)
        self.assertTrue(self.votingApi.add_vote(1, self.loc1, 5))
        self.assertEqual(self.votingApi.get_building_average("Location1", 0, time.time()), 3.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.0)
        # Try adding one vote with negative happiness value, one vote with too high happiness value
        self.assertFalse(self.votingApi.add_vote(1, self.loc1, -2))
        self.assertFalse(self.votingApi.add_vote(1, self.loc1, 9))
        # Check that average values did not get updated
        self.assertEqual(self.votingApi.get_building_average("Location1", 0, time.time()), 3.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.0)
        # Adding three votes to Location 2: 2, 5, 5, check that building/campus averages get updated properly
        self.assertTrue(self.votingApi.add_vote(1, self.loc2, 2))
        self.assertEqual(self.votingApi.get_building_average("Location2", 0, time.time()), 2.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 2.75)
        self.assertTrue(self.votingApi.add_vote(1, self.loc2, 5))
        self.assertEqual(self.votingApi.get_building_average("Location2", 0, time.time()), 3.5)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.2)
        self.assertTrue(self.votingApi.add_vote(1, self.loc2, 5))
        self.assertEqual(self.votingApi.get_building_average("Location2", 0, time.time()), 4.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.5)


if __name__ == '__main__':
    unittest.main()
