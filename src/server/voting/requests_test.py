import json
from unittest import mock, TestCase, main

from server import DatabaseManager
from server.run import get_flask_app
from server.voting.requests import votingAPI

app = get_flask_app()
app.testing = True

# Replace the database with an in-memory one to eliminate the risk of corruption during testing. Also silence logging
votingAPI.database = DatabaseManager(':memory:')

SUCCESS_RESPONSE = (json.dumps('Success') + '\n').encode('ascii')
FAILURE_RESPONSE = (json.dumps('Invalid request') + '\n').encode('ascii')


class VotingRequestsTest(TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_user_id_does_not_change(self):
        self.client.post('/request/issue_user_id')
        initial_cookies = list(self.client.cookie_jar)
        self.client.post('/request/issue_user_id')
        self.assertCountEqual(initial_cookies, list(self.client.cookie_jar))

    @mock.patch.object(votingAPI, 'add_vote', return_value=True)
    def test_add_vote_valid(self, mocked):
        self.client.post('/request/issue_user_id')
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        self.assertEqual(response.data, SUCCESS_RESPONSE)
        self.assertTrue(mocked.called)

    @mock.patch.object(votingAPI, 'add_vote', return_value=False)
    def test_add_vote_valid_but_rejected_by_database(self, mocked):
        self.client.post('/request/issue_user_id')
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertTrue(mocked.called)

    @mock.patch.object(votingAPI, 'add_vote')
    def test_add_vote_invalid(self, mocked):
        self.client.post('/request/issue_user_id')
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': -1})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertFalse(mocked.called)

    @mock.patch.object(votingAPI, 'add_vote')
    def test_add_vote_no_cookie(self, mocked):
        self.client.cookie_jar.clear()
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertFalse(mocked.called)

    @mock.patch.object(votingAPI, 'get_campus_average', return_value=3.0)
    def test_get_campus_average_valid(self, mocked):
        response = self.client.post('/request/get_campus_average', data={'start_time': 0, 'end_time': 100})
        self.assertEqual(json.loads(response.data.decode('ascii')), 3.0)
        self.assertTrue(mocked.called)

    @mock.patch.object(votingAPI, 'get_campus_average')
    def test_get_campus_average_invalid(self, mocked):
        response = self.client.post('/request/get_campus_average', data={'start_time': -1})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertFalse(mocked.called)

    @mock.patch.object(votingAPI, 'get_building_average', return_value=3.0)
    def test_get_building_average_valid(self, mocked):
        response = self.client.post('/request/get_building_average', data={'start_time': 45, 'logical_location': 'ABC'})
        self.assertEqual(json.loads(response.data.decode('ascii')), 3.0)
        self.assertTrue(mocked.called)

    @mock.patch.object(votingAPI, 'get_building_average')
    def test_get_building_average_invalid(self, mocked):
        response = self.client.post('/request/get_building_average', data={'end_time': '45'})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertFalse(mocked.called)

    @mock.patch.object(votingAPI, 'get_heat_map', return_value=[])
    def test_get_heat_map_valid(self, mocked):
        response = self.client.post('/request/get_heatmap', data={'start_time': 45})
        self.assertEqual(json.loads(response.data.decode('ascii')), [])
        self.assertTrue(mocked.called)

    @mock.patch.object(votingAPI, 'get_heat_map', return_value=[])
    def test_get_heat_map_invalid(self, mocked):
        response = self.client.post('/request/get_heatmap', data={'end_time': -1})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertFalse(mocked.called)


if __name__ == '__main__':
    main()
