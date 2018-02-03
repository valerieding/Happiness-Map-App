import unittest
import time
from tempfile import NamedTemporaryFile
from database import DatabaseManager
from voting_api import VotingAPI
from location import Location


class VotingApiTest(unittest.TestCase):
    loc1 = Location(1, 2, "Location1", "Address1")
    loc2 = Location(2, 4, "Location2", "Address2")

    def setUp(self):
        self.file = NamedTemporaryFile()
        print(self.file.name)
        self.db = DatabaseManager(self.file.name)
        self.votingApi = VotingAPI(self.db)

    def tearDown(self):
        self.file.close()

    def test_add_vote(self):
        # Adding three votes to Location 1: 3, 1, 5
        self.votingApi.add_vote(1, self.loc1, 3)
        self.assertEqual(self.votingApi.get_building_average("Location1", 0, time.time()), 3.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.0)
        self.votingApi.add_vote(1, self.loc1, 1)
        self.assertEqual(self.votingApi.get_building_average("Location1", 0, time.time()), 2.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 2.0)
        self.votingApi.add_vote(1, self.loc1, 5)
        self.assertEqual(self.votingApi.get_building_average("Location1", 0, time.time()), 3.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.0)
        # Try adding one vote with negative happiness value, one vote with too high happiness value
        try:
            self.votingApi.add_vote(1, self.loc1, -2)
        except:
            print("Caught: tried adding a vote with a negative happiness value")
        try:
            self.votingApi.add_vote(1, self.loc1, 9)
        except:
            print("Caught: tried adding a vote with a too large happiness value")
        # Check that average values did not get updated
        self.assertEqual(self.votingApi.get_building_average("Location1", 0, time.time()), 3.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.0)
        # Adding three votes to Location 2: 2, 5, 5
        self.votingApi.add_vote(1, self.loc2, 2)
        self.assertEqual(self.votingApi.get_building_average("Location2", 0, time.time()), 2.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 2.75)
        self.votingApi.add_vote(1, self.loc2, 5)
        self.assertEqual(self.votingApi.get_building_average("Location2", 0, time.time()), 3.5)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.2)
        self.votingApi.add_vote(1, self.loc2, 5)
        self.assertEqual(self.votingApi.get_building_average("Location2", 0, time.time()), 4.0)
        self.assertEqual(self.votingApi.get_campus_average(0, time.time()), 3.5)


if __name__ == '__main__':
        unittest.main()






























