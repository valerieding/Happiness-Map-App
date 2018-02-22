import json
from unittest import mock, TestCase, main

from server.database.database import DatabaseManager
from server.run import get_flask_app, messageAPI

app = get_flask_app(has_admin_privileges=True)
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
                                    data={'logical_location': 'Mansueto', 'start_time': 4.3})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'get_recent_posts', return_value=DUMMY_RESPONSE)
    def test_get_recent_posts_invalid(self, mocked):
        response = self.client.post('/request/get_recent_posts',
                                    data={'logical_location': 'Mansueto', 'start_time': -1.3})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(messageAPI, 'get_recent_posts', return_value=DUMMY_RESPONSE)
    def test_get_recent_personal_posts_valid(self, mocked):
        response = self.client.post('/request/get_recent_personal_posts',
                                    data={'logical_location': 'Mansueto', 'start_time': 4.3})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'get_recent_posts', return_value=DUMMY_RESPONSE)
    def test_get_recent_personal_posts_invalid(self, mocked):
        response = self.client.post('/request/get_recent_personal_posts',
                                    data={'logical_location': 'Mansueto', 'start_time': -1.3})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(messageAPI, 'get_trending_posts', return_value=DUMMY_RESPONSE)
    def test_get_trending_posts_valid(self, mocked):
        response = self.client.post('/request/get_trending_posts',
                                    data={'logical_location': 'Mansueto', 'start_time': 4.3})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'get_trending_posts', return_value=DUMMY_RESPONSE)
    def test_get_trending_posts_invalid(self, mocked):
        response = self.client.post('/request/get_trending_posts',
                                    data={'logical_location': 'Mansueto', 'start_time': -5.3})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(messageAPI, 'get_trending_posts', return_value=DUMMY_RESPONSE)
    def test_get_recent_trending_posts_valid(self, mocked):
        response = self.client.post('/request/get_trending_personal_posts',
                                    data={'logical_location': 'Mansueto', 'start_time': 4.3})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(messageAPI, 'get_trending_posts', return_value=DUMMY_RESPONSE)
    def test_get_trending_personal_posts_invalid(self, mocked):
        response = self.client.post('/request/get_trending_personal_posts',
                                    data={'logical_location': 'not a logical location', 'start_time': -1.3})
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

    @mock.patch.object(messageAPI, 'remove_post')
    def test_remove_post_valid(self, mocked):
        self.client.post('/request/remove_post', data={'post_id': 10})
        self.assertTrue(mocked.called)

    @mock.patch.object(messageAPI, 'remove_post')
    def test_remove_post_invalid(self, mocked):
        self.client.post('/request/remove_post', data={})
        self.assertFalse(mocked.called)


if __name__ == '__main__':
    main()
