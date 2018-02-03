#TODO: implement

import unittest
import time
from tempfile import NamedTemporaryFile
from database import DatabaseManager
from voting_api import VotingAPI
from location import Location


class VotingApiTest(unittest.TestCase):
    loc1 = Location(1, 2, "Location1", "Address1")
    loc2 = Location(2, 4, "Location2", "Address2")
    loc3 = Location(80, 140, "Location3", "Address3")
    loc4 = Location(4, 5, "Location4", "Address4")

    def setUp(self):
        self.file = NamedTemporaryFile()
        self.db = DatabaseManager(file.name)
        self.votingApi = VotingAPI(self.db)

    def tearDown(self):
        self.file.close()

    def test_add_vote(self):
        self.votingApi.add_vote(1, self.loc1, 4)
        self.assertEqual(self.votingApi.get_building_average("Location1", 0, time.time()), 4.0)
        self.assertEqual(self.votingApi.get_campus_average(), 4.0)
        self.votingApi.add_vote(1, self.loc1, 1)
        self.assertEqual(self.votingApi.get_building_average(), 4.0)
        self.assertEqual(self.votingApi.get_campus_average(), 4.0)

































