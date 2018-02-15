import json
from unittest import mock, TestCase, main

from server import DatabaseManager
from server.run import get_flask_app
from server.messages.requests import messageAPI

app = get_flask_app()
app.testing = True

# Replace the database with an in-memory one to eliminate the risk of database corruption during testing.
messageAPI.database = DatabaseManager(':memory:')

DUMMY_RESPONSE = ['SOME_DUMMY_RESPONSE']
JSON_DUMMY_RESPONSE = (json.dumps(DUMMY_RESPONSE, indent=2) + '\n').encode('ascii')
FAILURE_RESPONSE = (json.dumps('Invalid request') + '\n').encode('ascii')


class MessageRequestsTest(TestCase):
    def setUp(self):
        self.client = app.test_client()

    @mock.patch.object(messageAPI, 'get_recent_posts', return_value=DUMMY_RESPONSE)
    def test_get_recent_posts_valid(self, mocked):
        response = self.client.post('/request/get_recent_posts',
                                    data={'latitude': 45, 'longitude': 45, 'start_time': 4.3})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'get_recent_posts', return_value=DUMMY_RESPONSE)
    def test_get_recent_posts_invalid(self, mocked):
        response = self.client.post('/request/get_recent_posts',
                                    data={'latitude': 45, 'longitude': 45, 'start_time': -1.3})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(messageAPI, 'get_trending_posts', return_value=DUMMY_RESPONSE)
    def test_get_trending_posts_valid(self, mocked):
        response = self.client.post('/request/get_trending_posts',
                                    data={'latitude': 45, 'longitude': 45, 'start_time': 4.3})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'get_trending_posts', return_value=DUMMY_RESPONSE)
    def test_get_trending_posts_invalid(self, mocked):
        response = self.client.post('/request/get_trending_posts', data={'latitude': 45})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(messageAPI, 'add_post', return_value=DUMMY_RESPONSE)
    def test_add_post_valid(self, mocked):
        response = self.client.post('/request/add_post', data={'message': 'Something'})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'add_post', return_value=DUMMY_RESPONSE)
    def test_add_post_invalid(self, mocked):
        response = self.client.post('/request/add_post')
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(messageAPI, 'add_reaction', return_value=DUMMY_RESPONSE)
    def test_upvote_valid(self, mocked):
        response = self.client.post('/request/upvote', data={'post_id': 10})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'add_reaction', return_value=DUMMY_RESPONSE)
    def test_downvote_valid(self, mocked):
        response = self.client.post('/request/downvote', data={'post_id': 10})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'add_reaction', return_value=DUMMY_RESPONSE)
    def test_add_reaction_valid(self, mocked):
        response = self.client.post('/request/add_reaction', data={'post_id': 10, 'reaction': 'upvote'})
        self.assertTrue(mocked.called)
        self.assertEqual(mocked.call_args[0][1:], (10, 0))
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'add_reaction', return_value=DUMMY_RESPONSE)
    def test_add_reaction_invalid(self, mocked):
        response = self.client.post('/request/add_reaction', data={'post_id': 10, 'reaction': 'not_a_react'})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)


if __name__ == '__main__':
    main()
