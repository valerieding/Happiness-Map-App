import time
import unittest

from server import DatabaseManager
from server.database.message_api import MessageAPI
from server.database.voting_api import VotingAPI
from server.util import Location, Message
from unittest import mock

class MessageAPITest(unittest.TestCase):
    loc1 = Location(1, 2, "Location1")
    loc2 = Location(2, 4, "Location2")
    loc3 = Location(3, 3, "Location3")

    def setUp(self):
        self.db = DatabaseManager(":memory:")
        self.votingApi = VotingAPI(self.db)
        self.messageApi = MessageAPI(self.db)
        self.messageApi.logger = mock.Mock()

    #
    # def assertSequenceEqualMine(self, it1, it2):
    #     return self.message_equals(list(it1), list(it2))
    def test_post_failure(self):
        self.assertFalse(self.messageApi.add_post(4, self.loc1, "this is user 4, this post should fail"))
        self.assertTrue(self.votingApi.add_vote(2, self.loc2, 5))
        self.assertFalse(self.messageApi.add_post(2, self.loc2, None))

    def test_add_post(self):
        def filter_message(message):
            message.vote_id = 0
            message.post_id = 0
            message.timestamp = 0
            return message

        self.assertTrue(self.votingApi.add_vote(1, self.loc1, 3))
        self.assertTrue(self.votingApi.add_vote(2, self.loc2, 5))
        self.assertTrue(self.votingApi.add_vote(3, self.loc3, 1))

        self.assertTrue(self.messageApi.add_post(1, self.loc1, "This is USER 1 at location 1, adding my first post"))
        post_id1 = self.db.execute("SELECT * FROM posts WHERE uid = ?", (1,))[0][0]
        self.assertTrue(self.messageApi.add_post(2, self.loc2, "This is USER 2 at location 2, adding my first post"))
        post_id2 = self.db.execute("SELECT * FROM posts WHERE uid = ?", (2,))[0][0]
        self.assertTrue(self.messageApi.add_post(3, self.loc3, "This is USER 3 at location 3, adding my first post"))
        post_id3 = self.db.execute("SELECT * FROM posts WHERE uid = ?", (3,))[0][0]
        self.assertSequenceEqual(
            list(map(filter_message, (self.messageApi.get_recent_posts(self.loc1, 0, time.time())))),
            [Message(0, 0, None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, self.loc3),
            Message(0, 0, None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, self.loc2),
            Message(0, 0, None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, self.loc1)
        ])
        # TODO: test that this is ordered by upvotes/downvotes properly
        self.assertSequenceEqual(
            list(map(filter_message, (self.messageApi.get_trending_posts(self.loc1)))),
            [Message(0, 0, None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, self.loc3),
             Message(0, 0, None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, self.loc2),
             Message(0, 0, None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, self.loc1)
             ])

        # User 1 upvotes user 2's and user 3's posts:
        self.assertTrue(self.messageApi.upvote(1, post_id2))
        self.assertTrue(self.messageApi.upvote(1, post_id3))
        # User 3 upvotes user 2's post:
        self.assertTrue(self.messageApi.upvote(3, post_id2))
        # Fail to upvote/downvote with a null user ID
        self.assertFalse(self.messageApi.upvote(None, post_id2))
        self.assertFalse(self.messageApi.downvote(None, post_id2))
        # Recent posts should be the same
        self.assertSequenceEqual(
            list(map(filter_message, (self.messageApi.get_recent_posts(self.loc1, 0, time.time())))),
            [Message(0, 0, None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, self.loc3),
             Message(0, 0, None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, self.loc2),
             Message(0, 0, None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, self.loc1)
             ])
        # # Trending posts should be: user 2 (2 upvotes), user 3 (1 upvote), user 1 (0 upvotes)
        self.assertSequenceEqual(
            list(map(filter_message, (self.messageApi.get_trending_posts(self.loc1)))),
            [Message(0, 0, None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, self.loc2),
             Message(0, 0, None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, self.loc3),
             Message(0, 0, None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, self.loc1)
             ])
        # User 1 can't upvote user 2's post again:
        self.assertFalse(self.messageApi.upvote(1, post_id2))
        # User 1 downvotes user 2's post:
        self.assertTrue(self.messageApi.downvote(1, post_id2))
        # User 3 downvotes user 2's post:
        self.assertTrue(self.messageApi.downvote(3, post_id2))
        # User 3 cant downvote user 2's post AGAIN:
        self.assertFalse(self.messageApi.downvote(3, post_id2))
        # Trending posts should be: user 3 (1 upvotes), user 2 (2 upvotes 2 downtoves) or user 1 (0 upvotes)
        self.assertSequenceEqual(
            list(map(filter_message, (self.messageApi.get_trending_posts(self.loc1)))),
            [Message(0, 0, None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, self.loc3),
             Message(0, 0, None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, self.loc2),
             Message(0, 0, None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, self.loc1)
             ])
        # # User 1 adds another vote:
        self.votingApi.add_vote(1, self.loc1, 5)
        self.assertTrue(self.messageApi.add_post(1, self.loc1, "This is USER 1 at location 1, SECOND post"))
        self.assertSequenceEqual(
            list(map(filter_message, (self.messageApi.get_recent_posts(self.loc1, 0, time.time())))),
            [Message(0, 0, None, 1, 'This is USER 1 at location 1, SECOND post', 5, 0, self.loc1),
             Message(0, 0, None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, self.loc3),
             Message(0, 0, None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, self.loc2),
             Message(0, 0, None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, self.loc1)
             ])

        # post_id12 = (self.db.execute("SELECT * FROM posts WHERE uid = ? ORDER BY timestamp DESC LIMIT 1", (1,)))[0][0]
        # Remove post
        # self.assertTrue(self.messageApi.remove_post(post_id12))
        # self.assertSequenceEqual(
        #     list(map(filter_message, (self.messageApi.get_recent_posts(self.loc1, 0, time.time())))),
        #     [Message(0, 0, None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, self.loc3),
        #      Message(0, 0, None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, self.loc2),
        #      Message(0, 0, None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, self.loc1)
        #      ])
        # # Trying to remove post that is no longer in the database
        # self.assertFalse(self.messageApi.remove_post(post_id12))
        # # Trying to remove post with null post_id:
        # self.assertFalse(self.messageApi.remove_post(None))


if __name__ == '__main__':
    unittest.main()
