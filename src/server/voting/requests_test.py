import json
import pickle
import time
from base64 import urlsafe_b64encode
from unittest import mock, TestCase, main

from server.run import FlaskAppContext
from server.util import HeatMapPoint
from server.util.users import UserManager

context = FlaskAppContext(testing=True)
app = context.get(has_admin_privileges=True)

DUMMY_RESPONSE = ['SOME_DUMMY_RESPONSE']
JSON_DUMMY_RESPONSE = b'[\n  "SOME_DUMMY_RESPONSE"\n]\n'
SUCCESS_RESPONSE = b'"Success"\n'
FAILURE_RESPONSE = b'[\n  "Invalid request", \n  400\n]\n'


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

    @mock.patch.object(context.votingAPI, 'get_happiness_level', return_value=DUMMY_RESPONSE)
    def test_get_happiness_level_none(self, mocked):
        response = self.client.post('/request/get_happiness_level')
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(context.votingAPI, 'add_vote', return_value=True)
    def test_add_vote_valid(self, mocked):
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        self.assertEqual(response.data, SUCCESS_RESPONSE)
        self.assertTrue(mocked.called)

    @mock.patch.object(context.votingAPI, 'add_vote', return_value=False)
    def test_add_vote_valid_but_rejected_by_database(self, mocked):
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': 3})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertTrue(mocked.called)

    @mock.patch.object(context.votingAPI, 'add_vote')
    def test_add_vote_invalid(self, mocked):
        response = self.client.post('/request/add_vote', data={'latitude': 45, 'longitude': 45, 'happiness_level': -1})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertFalse(mocked.called)

    @mock.patch.object(context.votingAPI, 'get_recent_votes', return_value=DUMMY_RESPONSE)
    def test_get_recent_votes_valid(self, mocked):
        response = self.client.post('/request/get_recent_votes',
                                    data={'logical_location': 'Mansueto', 'start_time': 4.3})
        self.assertTrue(mocked.called)
        self.assertEqual(response.data, JSON_DUMMY_RESPONSE)

    @mock.patch.object(context.votingAPI, 'get_recent_votes', return_value=DUMMY_RESPONSE)
    def test_get_recent_votes_last_minute(self, mocked):
        self.client.post('/request/get_recent_votes', data={'end_time': -60})
        self.assertTrue(mocked.called)
        self.assertAlmostEqual(mocked.call_args[0][0].arguments[1], time.time() - 60, 1)

    @mock.patch.object(context.votingAPI, 'get_recent_votes', return_value=DUMMY_RESPONSE)
    def test_get_recent_votes_invalid(self, mocked):
        response = self.client.post('/request/get_recent_votes', data={'logical_location': "'"})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(context.votingAPI, 'get_votes_by', return_value=3.0)
    def test_get_campus_average_valid(self, mocked):
        response = self.client.post('/request/get_campus_average', data={'start_time': 0, 'end_time': 100})
        self.assertTrue(mocked.called)
        self.assertEqual(json.loads(response.data.decode('ascii')), 3.0)

    @mock.patch.object(context.votingAPI, 'get_votes_by')
    def test_get_campus_average_last_minute(self, mocked):
        self.client.post('/request/get_campus_average', data={'end_time': -60})
        self.assertTrue(mocked.called)
        self.assertAlmostEqual(mocked.call_args[0][0].arguments[1], (time.time() - 60), 2)

    @mock.patch.object(context.votingAPI, 'get_votes_by', return_value={'ABC': 3.0})
    def test_get_building_average_valid(self, mocked):
        response = self.client.post('/request/get_building_average', data={'start_time': 45, 'logical_location': 'ABC'})
        self.assertEqual(json.loads(response.data.decode('ascii')), 3.0)
        self.assertTrue(mocked.called)

    @mock.patch.object(context.votingAPI, 'get_votes_by')
    def test_get_building_average_invalid(self, mocked):
        response = self.client.post('/request/get_building_average', data={'end_time': '45'})
        self.assertEqual(response.data, FAILURE_RESPONSE)
        self.assertFalse(mocked.called)

    @mock.patch.object(context.votingAPI, 'get_votes_by', return_value={'A': 2.5, 'B': 3})
    def test_get_heat_map_valid(self, mocked):
        response = self.client.post('/request/get_heatmap', data={'start_time': 45})
        self.assertTrue(mocked.called)
        self.assertCountEqual(json.loads(response.data.decode('ascii')), [
            HeatMapPoint('A', 2.5).__dict__, HeatMapPoint('B', 3).__dict__
        ])

    @mock.patch.object(context.votingAPI, 'get_votes_by', return_value={'A': 2.5, 'B': 3})
    def test_get_votes_by_location(self, mocked):
        response = self.client.post('/request/get_votes_by', data={'group_by': 'loc'})
        self.assertTrue(mocked.called)
        self.assertCountEqual(json.loads(response.data.decode('ascii')), {'A': 2.5, 'B': 3})

    @mock.patch.object(context.votingAPI, 'get_votes_by', return_value=2.5)
    def test_get_votes_by_total(self, mocked):
        response = self.client.post('/request/get_votes_by', data={})
        self.assertTrue(mocked.called)
        self.assertEqual(json.loads(response.data.decode('ascii')), 2.5)

    @mock.patch.object(context.votingAPI, 'get_votes_by', return_value={'A': 2.5, 'B': 3})
    def test_get_votes_by_invalid(self, mocked):
        response = self.client.post('/request/get_votes_by', data={'group_by': 'invalid_grouping'})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(context.votingAPI, 'get_votes_by', return_value={'A': 2.5, 'B': 3})
    def test_get_personal_votes_by_location(self, mocked):
        response = self.client.post('/request/get_personal_votes_by', data={'group_by': 'loc'})
        self.assertTrue(mocked.called)
        self.assertCountEqual(json.loads(response.data.decode('ascii')), {'A': 2.5, 'B': 3})

    @mock.patch.object(context.votingAPI, 'get_votes_by', return_value={'A': 2.5, 'B': 3})
    def test_get_personal_votes_by_invalid(self, mocked):
        response = self.client.post('/request/get_personal_votes_by', data={'group_by': 'invalid_grouping'})
        self.assertFalse(mocked.called)
        self.assertEqual(response.data, FAILURE_RESPONSE)

    @mock.patch.object(context.votingAPI, 'get_happiness_level', return_value=3.0)
    def test_get_happiness_level_valid(self, mocked):
        response = self.client.post('/request/get_happiness_level')
        self.assertEqual(json.loads(response.data.decode('ascii')), 3.0)
        self.assertTrue(mocked.called)


if __name__ == '__main__':
    main()
