import time
import unittest

from server import DatabaseManager
from server.database.message_api import MessageAPI
from server.database.voting_api import VotingAPI
from server.util import Location, Reactions


class MessageAPITest(unittest.TestCase):
    loc1 = Location(1, 2, "Location1")
    loc2 = Location(2, 4, "Location2")
    loc3 = Location(3, 3, "Location3")

    def setUp(self):
        self.db = DatabaseManager(":memory:")
        self.votingApi = VotingAPI(self.db)
        self.messageApi = MessageAPI(self.db)

    def test_post_failure(self):
        self.assertFalse(self.messageApi.add_post(4, "this is user 4, this post should fail"))
        self.assertTrue(self.votingApi.add_vote(2, self.loc2, 5))
        self.assertFalse(self.messageApi.add_post(2, None))

    def test_add_post(self):
        keys_to_keep = ['user_id', 'message', 'happiness_level', 'reactions', 'location']

        def dummy_message(*values):
            return {k: v for k, v in zip(keys_to_keep, values)}

        def filter_messages(message_list):
            return [{k: message.__getattribute__(k) for k in keys_to_keep} for message in message_list]

        self.assertTrue(self.votingApi.add_vote(1, self.loc1, 3))
        self.assertTrue(self.votingApi.add_vote(2, self.loc2, 5))
        self.assertTrue(self.votingApi.add_vote(3, self.loc3, 1))

        self.assertTrue(self.messageApi.add_post(1, "This is USER 1, adding my first post"))
        post_id1 = self.db.execute("SELECT * FROM posts WHERE uid = ?", (1,))[0][0]
        time.sleep(0.01)  # TODO: instead mock the time.time().
        self.assertTrue(self.messageApi.add_post(2, "This is USER 2, adding my first post"))
        post_id2 = self.db.execute("SELECT * FROM posts WHERE uid = ?", (2,))[0][0]
        time.sleep(0.01)
        self.assertTrue(self.messageApi.add_post(3, "This is USER 3, adding my first post"))
        time.sleep(0.01)
        post_id3 = self.db.execute("SELECT * FROM posts WHERE uid = ?", (3,))[0][0]
        self.assertSequenceEqual(
            filter_messages(self.messageApi.get_recent_posts(self.loc1, 0, time.time())), [
                dummy_message(3, 'This is USER 3, adding my first post', 1, Reactions((0, 0)), self.loc3),
                dummy_message(2, 'This is USER 2, adding my first post', 5, Reactions((0, 0)), self.loc2),
                dummy_message(1, 'This is USER 1, adding my first post', 3, Reactions((0, 0)), self.loc1)
            ])
        # TODO: test that this is ordered by upvotes/downvotes properly
        self.assertSequenceEqual(
            filter_messages(self.messageApi.get_trending_posts(self.loc1)), [
                dummy_message(3, 'This is USER 3, adding my first post', 1, Reactions((0, 0)), self.loc3),
                dummy_message(2, 'This is USER 2, adding my first post', 5, Reactions((0, 0)), self.loc2),
                dummy_message(1, 'This is USER 1, adding my first post', 3, Reactions((0, 0)), self.loc1)
            ])

        # User 1 upvotes user 2's and user 3's posts:
        self.assertTrue(self.messageApi.add_reaction(1, post_id2, 0))
        self.assertTrue(self.messageApi.add_reaction(1, post_id3, 0))
        # User 3 upvotes user 2's post:
        self.assertTrue(self.messageApi.add_reaction(3, post_id2, 0))
        # Fail to upvote/downvote with a null user ID
        self.assertFalse(self.messageApi.add_reaction(None, post_id2, 0))
        self.assertFalse(self.messageApi.add_reaction(None, post_id2, 1))
        # Recent posts should be the same
        self.assertSequenceEqual(
            filter_messages(self.messageApi.get_recent_posts(self.loc1, 0, time.time())), [
                dummy_message(3, 'This is USER 3, adding my first post', 1, Reactions((1, 0)), self.loc3),
                dummy_message(2, 'This is USER 2, adding my first post', 5, Reactions((2, 0)), self.loc2),
                dummy_message(1, 'This is USER 1, adding my first post', 3, Reactions((0, 0)), self.loc1)
            ])
        # # Trending posts should be: user 2 (2 upvotes), user 3 (1 upvote), user 1 (0 upvotes)
        self.assertSequenceEqual(
            filter_messages(self.messageApi.get_trending_posts(self.loc1)), [
                dummy_message(2, 'This is USER 2, adding my first post', 5, Reactions((2, 0)), self.loc2),
                dummy_message(3, 'This is USER 3, adding my first post', 1, Reactions((1, 0)), self.loc3),
                dummy_message(1, 'This is USER 1, adding my first post', 3, Reactions((0, 0)), self.loc1)
            ])
        # User 1 downvotes user 2's post:
        self.assertTrue(self.messageApi.add_reaction(1, post_id2, 1))
        # User 3 downvotes user 2's post:
        self.assertTrue(self.messageApi.add_reaction(3, post_id2, 1))
        # Trending posts should be: user 3 (1 upvotes), user 2 (2 upvotes 2 downtoves) or user 1 (0 upvotes)
        self.assertSequenceEqual(
            filter_messages(self.messageApi.get_trending_posts(self.loc1)), [
                dummy_message(3, 'This is USER 3, adding my first post', 1, Reactions((1, 0)), self.loc3),
                dummy_message(1, 'This is USER 1, adding my first post', 3, Reactions((0, 0)), self.loc1),
                dummy_message(2, 'This is USER 2, adding my first post', 5, Reactions((0, 2)), self.loc2)
            ])
        # # User 1 adds another vote:
        self.votingApi.add_vote(1, self.loc1, 5)
        self.assertTrue(self.messageApi.add_post(1, "This is USER 1, SECOND post"))
        self.assertSequenceEqual(
            filter_messages(self.messageApi.get_recent_posts(self.loc1, 0, time.time())), [
                dummy_message(1, 'This is USER 1, SECOND post', 5, Reactions((0, 0)), self.loc1),
                dummy_message(3, 'This is USER 3, adding my first post', 1, Reactions((1, 0)), self.loc3),
                dummy_message(2, 'This is USER 2, adding my first post', 5, Reactions((0, 2)), self.loc2),
                dummy_message(1, 'This is USER 1, adding my first post', 3, Reactions((0, 0)), self.loc1)
            ])

        post_id12 = (self.db.execute("SELECT * FROM posts WHERE uid = ? ORDER BY timestamp DESC LIMIT 1", (1,)))[0][0]
        # Remove post
        self.messageApi.remove_post(post_id12)
        self.assertSequenceEqual(
            filter_messages(self.messageApi.get_recent_posts(self.loc1, 0, time.time())), [
                dummy_message(3, 'This is USER 3, adding my first post', 1, Reactions((1, 0)), self.loc3),
                dummy_message(2, 'This is USER 2, adding my first post', 5, Reactions((0, 2)), self.loc2),
                dummy_message(1, 'This is USER 1, adding my first post', 3, Reactions((0, 0)), self.loc1)
            ])
        # Make sure that nothing goes wrong if message is not existent present.
        self.messageApi.remove_post(post_id12)
        self.assertSequenceEqual(
            filter_messages(self.messageApi.get_recent_posts(self.loc1, 0, time.time())), [
                dummy_message(3, 'This is USER 3, adding my first post', 1, Reactions((1, 0)), self.loc3),
                dummy_message(2, 'This is USER 2, adding my first post', 5, Reactions((0, 2)), self.loc2),
                dummy_message(1, 'This is USER 1, adding my first post', 3, Reactions((0, 0)), self.loc1)
            ])


if __name__ == '__main__':
    unittest.main()
