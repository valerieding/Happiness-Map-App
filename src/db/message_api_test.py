#TODO: implement

import unittest
import time
from tempfile import NamedTemporaryFile
from database import DatabaseManager
from voting_api import VotingAPI
from message_api import MessageAPI
from location import Location


class MessageAPITest(unittest.TestCase):
    loc1 = Location(1, 2, "Location1", "Address1")
    loc2 = Location(2, 4, "Location2", "Address2")

    def setUp(self):
        self.file = NamedTemporaryFile()
        self.db = DatabaseManager(self.file.name)
        self.votingApi = VotingAPI(self.db)
        self.messageApi = MessageAPI(self.db)

    def tearDown(self):
        self.file.close()

    def compareTupleLists(self, tl1, tl2):
        set1 = set(tl1)
        set2 = set(tl2)
        self.assertEquals(set1, set2)

    def test_add_post(self):
        self.votingApi.add_vote(1, self.loc1, 3)
        self.votingApi.add_vote(2, self.loc2, 5)
        self.votingApi.add_vote(3, self.loc3, 1)
        vote_id1 = (self.db.execute("SELECT * FROM votes WHERE uid = ?", (1,)))[0][0]
        vote_id2 = (self.db.execute("SELECT * FROM votes WHERE uid = ?", (2,)))[0][0]
        vote_id3 = (self.db.execute("SELECT * FROM votes WHERE uid = ?", (3,)))[0][0]
        self.messageApi.add_post(1, self.loc1, "hi! i'm user 1 at location 1, adding my first post")
        self.messageApi.add_post(2, self.loc2, "hi! i'm user 2 at location 2, adding my first post")
        self.messageApi.add_post(2, self.loc3, "hi! i'm user 3 at location 3, adding my first post")


if __name__ == '__main__':
        unittest.main()
