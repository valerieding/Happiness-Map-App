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
    loc3 = Location(3, 3, "Location3", "Address3")

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
        self.assertTrue(self.votingApi.add_vote(1, self.loc1, 3))
        self.assertTrue(self.votingApi.add_vote(2, self.loc2, 5))
        self.assertTrue(self.votingApi.add_vote(3, self.loc3, 1))
        self.assertTrue(self.messageApi.add_post(1, self.loc1, "This is USER 1 at location 1, adding my first post"))
        post_id1 = (self.db.execute("SELECT * FROM posts WHERE uid = ?", (1,)))[0][0]
        self.assertTrue(self.messageApi.add_post(2, self.loc2, "This is USER 2 at location 2, adding my first post"))
        post_id2 = (self.db.execute("SELECT * FROM posts WHERE uid = ?", (2,)))[0][0]
        self.assertTrue(self.messageApi.add_post(3, self.loc3, "This is USER 3 at location 3, adding my first post"))
        post_id3 = (self.db.execute("SELECT * FROM posts WHERE uid = ?", (3,)))[0][0]
        self.assertFalse(self.messageApi.add_post(4, self.loc1, "this is user 4, this post should fail"))
        print(self.messageApi.get_recent_posts(self.loc1, 0, time.time()))
        print(self.messageApi.get_trending_posts(self.loc1))
        # User 1 upvotes user 2's and user 3's posts:
        self.assertTrue(self.messageApi.upvote(1, post_id2))
        self.assertTrue(self.messageApi.upvote(1, post_id3))
        # User 3 upvotes user 2's post:
        self.assertTrue(self.messageApi.upvote(3, post_id2))
        # Recent posts should be the same
        print(self.messageApi.get_recent_posts(self.loc1, 0, time.time()))
        # Trending posts should be: user 2 (2 upvotes), user 3 (1 upvote), user 1 (0 upvotes)
        print(self.messageApi.get_trending_posts(self.loc1))
        # User 1 can't upvote user 2's post again:
        self.assertFalse(self.messageApi.upvote(1, post_id2))
        # User 1 downvotes user 2's post:
        self.assertTrue(self.messageApi.downvote(1, post_id2))
        # User 3 downvotes user 2's post:
        self.assertTrue(self.messageApi.downvote(3, post_id2))
        # Trending posts should be: user 3 (1 upvotes), user 2 (2 upvotes 2 downtoves) or user 1 (0 upvotes)
        print(self.messageApi.get_trending_posts(self.loc1))
        # User 1 adds another vote:
        self.votingApi.add_vote(1, self.loc1, 5)
        self.assertTrue(self.messageApi.add_post(1, self.loc1, "This is USER 1 at location 1, SECOND post"))
        print(self.messageApi.get_recent_posts(self.loc1, 0, time.time()))
        post_id12 = (self.db.execute("SELECT * FROM posts WHERE uid = ? ORDER BY timestamp DESC LIMIT 1", (1,)))[0][0]
        self.assertTrue(self.messageApi.remove_post(post_id12))
        print(self.messageApi.get_recent_posts(self.loc1, 0, time.time()))


if __name__ == '__main__':
        unittest.main()
