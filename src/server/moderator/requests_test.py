from http import HTTPStatus
from unittest import mock, TestCase, main, skip

from server.run import FlaskAppContext

context = FlaskAppContext(testing=True)
app = context.get()

DUMMY_RESPONSE = ['SOME_DUMMY_RESPONSE']
JSON_DUMMY_RESPONSE = b'[\n  "SOME_DUMMY_RESPONSE"\n]\n'


class AdminRequestsTest(TestCase):
    def setUp(self):
        self.client = app.test_client()

    def _validate_cookie_jar(self):
        return context.admin_manager.validate_cookie({c.name: c.value for c in list(self.client.cookie_jar)})

    @mock.patch.object(context.messageAPI, 'remove_post')
    def test_remove_post_valid(self, mocked):
        self.client.post('/request/remove_post', data={'post_id': 10})
        self.assertTrue(mocked.called)

    @mock.patch.object(context.messageAPI, 'remove_post')
    def test_remove_post_invalid(self, mocked):
        self.client.post('/request/remove_post', data={})
        self.assertFalse(mocked.called)

    def test_admin_login_valid(self):
        response = self.client.post('/request/admin_login', data={'username': 'admin', 'password': 'password'})
        self.assertEquals(response.status_code, HTTPStatus.FOUND)
        self.assertTrue(self._validate_cookie_jar())

    def test_admin_login_invalid(self):
        response = self.client.post('/request/admin_login', data={'username': 'not_admin', 'password': 'password'})
        self.assertEquals(response.status_code, HTTPStatus.UNAUTHORIZED)
        self.assertFalse(self._validate_cookie_jar())
        response = self.client.post('/request/admin_login', data={'username': 'admin', 'password': 'bad_password'})
        self.assertEquals(response.status_code, HTTPStatus.UNAUTHORIZED)
        self.assertFalse(self._validate_cookie_jar())

    def test_admin_logout(self):
        self.client.post('/request/admin_login', data={'username': 'admin', 'password': 'password'})
        response = self.client.post('/request/admin_logout')
        self.assertEquals(response.status_code, HTTPStatus.OK)
        self.assertFalse(self._validate_cookie_jar())

    @skip
    def test_session_end(self):
        with self.client.session_transaction() as session:
            self.client.post('/request/admin_login', data={'username': 'admin', 'password': 'password'})
        self.assertFalse(self._validate_cookie_jar())


if __name__ == '__main__':
    main()