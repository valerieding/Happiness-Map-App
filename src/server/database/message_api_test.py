import time
import unittest
from unittest.mock import Mock

from server.database.database import DatabaseManager
from server.database.message_api import MessageAPI
from server.database.voting_api import VotingAPI
from server.util import Location, Reactions, ResultFilter

LOCATIONS = [Location(i * 10, i * 20, "LABEL_{}".format(i)) for i in range(5)]
UPVOTE = 0
DOWNVOTE = 1

KEYS_TO_KEEP = ['user_id', 'message', 'happiness_level', 'reactions', 'location']


def dummy_message(*values):
    return {k: v for k, v in zip(KEYS_TO_KEEP, values)}


def filter_messages(message_list):
    return [{k: message.__getattribute__(k) for k in KEYS_TO_KEEP} for message in message_list]


class MockFilter(ResultFilter):
    def __init__(self, start_time=0, end_time=float('inf'), **kwargs):
        # Feed in a dummy form to ResultFilter with `start_time` and `and_time`.
        form = Mock()
        form.start_time.data = start_time
        form.end_time.data = end_time
        super().__init__(form)
        for key, value in kwargs.items():
            self.add(key, value)


class MessageAPITest(unittest.TestCase):

    def _populate(self):
        for i in range(len(LOCATIONS)):
            self.votingApi.add_vote(i, LOCATIONS[i], i % 6)
            self.messageApi.add_post(i, "message_{}".format(i))
            time.sleep(0.01)  # Done to ensure order is predictable. TODO: instead mock the time.time().

        self.post_of = {uid: post_id for uid, post_id in self.db.execute('SELECT uid, id FROM posts')}

        self.messageApi.add_reaction(0, self.post_of[2], UPVOTE)
        self.messageApi.add_reaction(1, self.post_of[2], UPVOTE)
        self.messageApi.add_reaction(2, self.post_of[2], DOWNVOTE)
        self.messageApi.add_reaction(3, self.post_of[0], UPVOTE)
        self.messageApi.add_reaction(0, self.post_of[1], DOWNVOTE)

    def setUp(self):
        self.db = DatabaseManager(":memory:")
        self.votingApi = VotingAPI(self.db)
        self.messageApi = MessageAPI(self.db)

    def _get_recent_posts(self, filter=MockFilter()):
        return filter_messages(self.messageApi.get_recent_posts(filter))

    def _get_trending_posts(self, filter=MockFilter()):
        return filter_messages(self.messageApi.get_trending_posts(filter))

    def test_add_post_valid(self):
        # No posts present
        self.assertSequenceEqual(self._get_recent_posts(), [])
        # Add one valid post
        self.assertTrue(self.votingApi.add_vote(0, LOCATIONS[0], 2))
        self.assertTrue(self.messageApi.add_post(0, "msg"))
        self.assertSequenceEqual(self._get_recent_posts(), [
            dummy_message(0, 'msg', 2, Reactions((0, 0)), LOCATIONS[0])
        ])

    def test_add_post_invalid(self):
        # No vote => can't post
        self.assertFalse(self.messageApi.add_post(0, "msg"))
        # No post should have been inserted
        self.assertSequenceEqual(self._get_recent_posts(), [])

    def test_post_ordering(self):
        self._populate()
        self.assertSequenceEqual(self._get_recent_posts(), [
            dummy_message(4, 'message_4', 4, Reactions((0, 0)), LOCATIONS[4]),
            dummy_message(3, 'message_3', 3, Reactions((0, 0)), LOCATIONS[3]),
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
            dummy_message(1, 'message_1', 1, Reactions((0, 1)), LOCATIONS[1]),
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0])
        ])
        self.assertSequenceEqual(self._get_trending_posts(), [
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0]),
            dummy_message(4, 'message_4', 4, Reactions((0, 0)), LOCATIONS[4]),
            dummy_message(3, 'message_3', 3, Reactions((0, 0)), LOCATIONS[3]),
            dummy_message(1, 'message_1', 1, Reactions((0, 1)), LOCATIONS[1])
        ])

    def test_add_reaction_valid(self):
        self._populate()
        # User 0 changes UPVOTE on user 2's post to a DOWNVOTE
        self.assertTrue(self.messageApi.add_reaction(0, self.post_of[2], DOWNVOTE))
        # Now user 2 should have 1 upvote and 2 downvotes
        self.assertSequenceEqual(self._get_trending_posts(), [
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0]),
            dummy_message(4, 'message_4', 4, Reactions((0, 0)), LOCATIONS[4]),
            dummy_message(3, 'message_3', 3, Reactions((0, 0)), LOCATIONS[3]),
            dummy_message(2, 'message_2', 2, Reactions((1, 2)), LOCATIONS[2]),
            dummy_message(1, 'message_1', 1, Reactions((0, 1)), LOCATIONS[1])
        ])

    def test_add_reaction_invalid(self):
        self._populate()
        # None user_id's should not be able to add reactions
        self.assertFalse(self.messageApi.add_reaction(None, self.post_of[0], UPVOTE))
        # Reactions should not change
        self.assertSequenceEqual(self._get_recent_posts(), [
            dummy_message(4, 'message_4', 4, Reactions((0, 0)), LOCATIONS[4]),
            dummy_message(3, 'message_3', 3, Reactions((0, 0)), LOCATIONS[3]),
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
            dummy_message(1, 'message_1', 1, Reactions((0, 1)), LOCATIONS[1]),
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0])
        ])

    def test_filter_timestamp(self):
        self._populate()
        lim = self.db.execute('SELECT timestamp from posts WHERE uid = 2')[0][0]
        self.assertSequenceEqual(self._get_recent_posts(MockFilter(end_time=lim)), [
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
            dummy_message(1, 'message_1', 1, Reactions((0, 1)), LOCATIONS[1]),
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0])
        ])
        self.assertSequenceEqual(self._get_recent_posts(MockFilter(start_time=lim)), [
            dummy_message(4, 'message_4', 4, Reactions((0, 0)), LOCATIONS[4]),
            dummy_message(3, 'message_3', 3, Reactions((0, 0)), LOCATIONS[3]),
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
        ])
        self.assertSequenceEqual(self._get_trending_posts(MockFilter(end_time=lim)), [
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0]),
            dummy_message(1, 'message_1', 1, Reactions((0, 1)), LOCATIONS[1])
        ])
        self.assertSequenceEqual(self._get_trending_posts(MockFilter(start_time=lim)), [
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
            dummy_message(4, 'message_4', 4, Reactions((0, 0)), LOCATIONS[4]),
            dummy_message(3, 'message_3', 3, Reactions((0, 0)), LOCATIONS[3]),
        ])

    def test_filter_timestamp_negative(self):
        self._populate()
        lim = self.db.execute('SELECT timestamp from posts WHERE uid = 2')[0][0]
        time.sleep(0.02)
        self.assertSequenceEqual(self._get_recent_posts(MockFilter(end_time=lim - time.time())), [
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
            dummy_message(1, 'message_1', 1, Reactions((0, 1)), LOCATIONS[1]),
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0])
        ])
        self.assertSequenceEqual(self._get_recent_posts(MockFilter(start_time=lim - time.time())), [
            dummy_message(4, 'message_4', 4, Reactions((0, 0)), LOCATIONS[4]),
            dummy_message(3, 'message_3', 3, Reactions((0, 0)), LOCATIONS[3]),
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
        ])

    def test_filter_location(self):
        self._populate()
        self.assertSequenceEqual(self._get_recent_posts(MockFilter(logical_loc='LABEL_0')), [
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0]),
        ])

    def test_filter_uid(self):
        self._populate()
        self.assertSequenceEqual(self._get_recent_posts(MockFilter(uid=2)), [
            dummy_message(2, 'message_2', 2, Reactions((2, 1)), LOCATIONS[2]),
        ])

    def test_remove_post(self):
        self._populate()
        self.messageApi.remove_post(self.post_of[2])
        self.assertSequenceEqual(self._get_recent_posts(), [
            dummy_message(4, 'message_4', 4, Reactions((0, 0)), LOCATIONS[4]),
            dummy_message(3, 'message_3', 3, Reactions((0, 0)), LOCATIONS[3]),
            dummy_message(1, 'message_1', 1, Reactions((0, 1)), LOCATIONS[1]),
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0])
        ])
        # Make sure that nothing goes wrong if message is not existent present.
        self.messageApi.remove_post(self.post_of[2])
        self.assertSequenceEqual(self._get_recent_posts(), [
            dummy_message(4, 'message_4', 4, Reactions((0, 0)), LOCATIONS[4]),
            dummy_message(3, 'message_3', 3, Reactions((0, 0)), LOCATIONS[3]),
            dummy_message(1, 'message_1', 1, Reactions((0, 1)), LOCATIONS[1]),
            dummy_message(0, 'message_0', 0, Reactions((1, 0)), LOCATIONS[0])
        ])


if __name__ == '__main__':
    unittest.main()
