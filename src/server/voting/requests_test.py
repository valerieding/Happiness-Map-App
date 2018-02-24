import json
import time
from base64 import urlsafe_b64encode
from unittest import mock, TestCase, main

import pickle

from server.database.database import DatabaseManager
from server.run import get_flask_app, votingAPI
from server.util.users import UserManager

app = get_flask_app()
app.testing = True

# Replace the database with an in-memory one to eliminate the risk of corruption during testing. Also silence logging
votingAPI.database = DatabaseManager(':memory:')

DUMMY_RESPONSE = ['SOME_DUMMY_RESPONSE']
JSON_DUMMY_RESPONSE = (json.dumps(DUMMY_RESPONSE, indent=2) + '\n').encode('ascii')
SUCCESS_RESPONSE = (json.dumps('Success') + '\n').encode('ascii')
FAILURE_RESPONSE = (json.dumps('Invalid request') + '\n').encode('ascii')


class VotingRequestsTest(TestCase):
    def setUp(self):
        self.client = app.test_client()

    def _get_cookie(self):
        return next(iter(c.value for c in list(self.client.cookie_jar) if c.name == 'user_id'), None)

    def _test_wrong_cookie(self, cookie):
        self.client.set_cookie('localhost', 'user_id', cookie)
        cookie = self._get_cookie()
        self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        self.assertNotEqual(cookie, self._get_cookie())

    def test_user_id_does_not_change(self):
        self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        initial_cookie = self._get_cookie()
        self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        self.assertEqual(initial_cookie, self._get_cookie())

    def test_arbitrary_cookie(self):
        self._test_wrong_cookie('arbitrary cookie value')

    def test_corrupted_cookie(self):
        self._test_wrong_cookie(urlsafe_b64encode(pickle.dumps('corrupted_cookie_value')))

    def test_malicious_cookie(self):
        self._test_wrong_cookie(UserManager._encode(123, 'definitely not a user signature'))

    @mock.patch.object(votingAPI, 'get_happiness_level', return_value=DUMMY_RESPONSE)
    def test_get_happiness_level_none(self, mocked):
        response = self.client.post('/request/get_happiness_level')
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(votingAPI, 'add_vote', return_value=True)
    def test_add_vote_valid(self, mocked):
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        self.assertEqual(response.data, SUCCESS_RESPONSE)
        self.assertTrue(mocked.called)

    @mock.patch.object(votingAPI, 'add_vote', return_value=False)
    def test_add_vote_valid_but_rejected_by_database(self, mocked):
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertTrue(mocked.called)

    @mock.patch.object(votingAPI, 'add_vote')
    def test_add_vote_invalid(self, mocked):
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': -1})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertFalse(mocked.called)

    @mock.patch.object(votingAPI, 'get_recent_votes', return_value=DUMMY_RESPONSE)
    def test_get_recent_votes_valid(self, mocked):
        response = self.client.post('/request/get_recent_votes',
                                    data={'logical_location': 'Mansueto', 'start_time': 4.3})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(votingAPI, 'get_recent_votes', return_value=DUMMY_RESPONSE)
    def test_get_recent_votes_last_minute(self, mocked):
        self.client.post('/request/get_recent_votes', data={'end_time': -60})
        self.assertTrue(mocked.called)
        self.assertAlmostEqual(mocked.call_args[0][0].arguments[1], time.time() - 60, 1)

    @mock.patch.object(votingAPI, 'get_recent_votes', return_value=DUMMY_RESPONSE)
    def test_get_recent_votes_invalid(self, mocked):
        response = self.client.post('/request/get_recent_votes', data={'logical_location': "'"})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(votingAPI, 'get_campus_average', return_value=3.0)
    def test_get_campus_average_valid(self, mocked):
        response = self.client.post('/request/get_campus_average', data={'start_time': 0, 'end_time': 100})
        self.assertEqual(json.loads(response.data.decode('ascii')), 3.0)
        self.assertTrue(mocked.called)

    @mock.patch.object(votingAPI, 'get_campus_average')
    def test_get_campus_average_last_minute(self, mocked):
        self.client.post('/request/get_campus_average', data={'end_time': -60})
        self.assertTrue(mocked.called)
        self.assertAlmostEqual(mocked.call_args[0][1], (time.time() - 60))

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

    @mock.patch.object(votingAPI, 'get_happiness_level', return_value=3.0)
    def test_get_happiness_level_valid(self, mocked):
        response = self.client.post('/request/get_happiness_level')
        self.assertEqual(json.loads(response.data.decode('ascii')), 3.0)
        self.assertTrue(mocked.called)


if __name__ == '__main__':
    main()
