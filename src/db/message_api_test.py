import unittest
import time

from database import DatabaseManager
from voting_api import VotingAPI
from message_api import MessageAPI
from location import Location


class MessageAPITest(unittest.TestCase):
    loc1 = Location(1, 2, "Location1", "Address1")
    loc2 = Location(2, 4, "Location2", "Address2")
    loc3 = Location(3, 3, "Location3", "Address3")

    def setUp(self):
        self.db = DatabaseManager(":memory:")
        self.votingApi = VotingAPI(self.db)
        self.messageApi = MessageAPI(self.db)

    def test_add_post(self):
        def filter_posts(post_list):
            return [tuple([post[index] for index in [2, 3, 4, 5, 6, 7, 9, 10, 11]]) for post in post_list]

        self.assertTrue(self.votingApi.add_vote(1, self.loc1, 3))
        self.assertTrue(self.votingApi.add_vote(2, self.loc2, 5))
        self.assertTrue(self.votingApi.add_vote(3, self.loc3, 1))

        self.assertTrue(self.messageApi.add_post(1, self.loc1, "This is USER 1 at location 1, adding my first post"))
        post_id1 = self.db.execute("SELECT * FROM posts WHERE uid = ?", (1,))[0][0]
        self.assertTrue(self.messageApi.add_post(2, self.loc2, "This is USER 2 at location 2, adding my first post"))
        post_id2 = self.db.execute("SELECT * FROM posts WHERE uid = ?", (2,))[0][0]
        self.assertTrue(self.messageApi.add_post(3, self.loc3, "This is USER 3 at location 3, adding my first post"))
        post_id3 = self.db.execute("SELECT * FROM posts WHERE uid = ?", (3,))[0][0]
        self.assertFalse(self.messageApi.add_post(4, self.loc1, "this is user 4, this post should fail"))
        print(filter_posts(self.messageApi.get_recent_posts(self.loc1, 0, time.time())))
        self.assertSequenceEqual(filter_posts(self.messageApi.get_recent_posts(self.loc1, 0, time.time())), [
            (None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, 0, 3.0, 3.0, 'Location3'),
            (None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, 0, 2.0, 4.0, 'Location2'),
            (None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, 0, 1.0, 2.0, 'Location1')
        ])
        # TODO: test that this is ordered by upvotes/downvotes properly
        self.assertSequenceEqual(filter_posts(self.messageApi.get_trending_posts(self.loc1)), [
            (None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, 0, 3.0, 3.0, 'Location3'),
            (None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, 0, 2.0, 4.0, 'Location2'),
            (None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, 0, 1.0, 2.0, 'Location1')
        ])

        # User 1 upvotes user 2's and user 3's posts:
        self.assertTrue(self.messageApi.upvote(1, post_id2))
        self.assertTrue(self.messageApi.upvote(1, post_id3))
        # User 3 upvotes user 2's post:
        self.assertTrue(self.messageApi.upvote(3, post_id2))
        # Recent posts should be the same
        self.assertSequenceEqual(filter_posts(self.messageApi.get_recent_posts(self.loc1, 0, time.time())), [
            (None, 3, 'This is USER 3 at location 3, adding my first post', 1, 1, 0, 3.0, 3.0, 'Location3'),
            (None, 2, 'This is USER 2 at location 2, adding my first post', 5, 2, 0, 2.0, 4.0, 'Location2'),
            (None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, 0, 1.0, 2.0, 'Location1')
        ])
        # Trending posts should be: user 2 (2 upvotes), user 3 (1 upvote), user 1 (0 upvotes)
        self.assertSequenceEqual(filter_posts(self.messageApi.get_trending_posts(self.loc1)), [
            (None, 2, 'This is USER 2 at location 2, adding my first post', 5, 2, 0, 2.0, 4.0, 'Location2'),
            (None, 3, 'This is USER 3 at location 3, adding my first post', 1, 1, 0, 3.0, 3.0, 'Location3'),
            (None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, 0, 1.0, 2.0, 'Location1')
        ])
        # User 1 can't upvote user 2's post again:
        self.assertFalse(self.messageApi.upvote(1, post_id2))
        # User 1 downvotes user 2's post:
        self.assertTrue(self.messageApi.downvote(1, post_id2))
        # User 3 downvotes user 2's post:
        self.assertTrue(self.messageApi.downvote(3, post_id2))
        # Trending posts should be: user 3 (1 upvotes), user 2 (2 upvotes 2 downtoves) or user 1 (0 upvotes)
        self.assertSequenceEqual(filter_posts(self.messageApi.get_trending_posts(self.loc1)), [
            (None, 3, 'This is USER 3 at location 3, adding my first post', 1, 1, 0, 3.0, 3.0, 'Location3'),
            (None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, 2, 2.0, 4.0, 'Location2'),
            (None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, 0, 1.0, 2.0, 'Location1')
        ])
        # User 1 adds another vote:
        self.votingApi.add_vote(1, self.loc1, 5)
        self.assertTrue(self.messageApi.add_post(1, self.loc1, "This is USER 1 at location 1, SECOND post"))
        self.assertSequenceEqual(filter_posts(self.messageApi.get_recent_posts(self.loc1, 0, time.time())), [
            (None, 1, 'This is USER 1 at location 1, SECOND post', 5, 0, 0, 1.0, 2.0, 'Location1'),
            (None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, 0, 3.0, 3.0, 'Location3'),
            (None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, 0, 2.0, 4.0, 'Location2'),
            (None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, 0, 1.0, 2.0, 'Location1')
        ])
        post_id12 = (self.db.execute("SELECT * FROM posts WHERE uid = ? ORDER BY timestamp DESC LIMIT 1", (1,)))[0][0]
        # Remove post
        self.assertTrue(self.messageApi.remove_post(post_id12))
        self.assertSequenceEqual(filter_posts(self.messageApi.get_recent_posts(self.loc1, 0, time.time())), [
            (None, 3, 'This is USER 3 at location 3, adding my first post', 1, 0, 0, 3.0, 3.0, 'Location3'),
            (None, 2, 'This is USER 2 at location 2, adding my first post', 5, 0, 0, 2.0, 4.0, 'Location2'),
            (None, 1, 'This is USER 1 at location 1, adding my first post', 3, 0, 0, 1.0, 2.0, 'Location1')
        ])
        # Trying to remove post that is no longer in the database
        self.assertFalse(self.messageApi.remove_post(post_id12))


if __name__ == '__main__':
        unittest.main()
