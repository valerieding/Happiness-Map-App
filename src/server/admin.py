import getpass
import hashlib
import os
import time
from http import HTTPStatus

from flask import make_response
from flask import request, redirect
from wtforms import Form, StringField, validators, PasswordField

from server.util.forms import PostIDForm
from server.util.request_handler import RequestHandler
from server.util.users import CookieManager


class RemovePostForm(Form, PostIDForm):
    """Validates the remove_post request form. """


class AdminLoginForm(Form):
    """Validates the admin login request form. """
    username = StringField('username', validators=[validators.InputRequired()])
    password = PasswordField('password', validators=[validators.InputRequired()])


class AdminRequests(RequestHandler):

    def __init__(self, messageAPI, user_manager, admin_manager):
        super().__init__(user_manager)
        self.admin_manager = admin_manager
        self.messageAPI = messageAPI

    def remove_post(self, form, user_id):
        self.logger.info('ADMIN ACTION: user {} initiated a remove_post on {}'.format(user_id, form.post_id.data))
        self.messageAPI.remove_post(form.post_id.data)

    def admin_login(self):
        form = AdminLoginForm(request.form)
        if not form.validate():
            return '', HTTPStatus.BAD_REQUEST
        if not self.admin_manager.authenticate(form.username.data, form.password.data):
            return '', HTTPStatus.UNAUTHORIZED
        response = redirect('/board')
        self.admin_manager.set_cookie(response)
        return response

    def admin_logout(self):
        response = make_response('')
        self.admin_manager.unset_cookie(response)
        return response, HTTPStatus.OK

    def get_routes(self):
        return [(self.remove_post, RemovePostForm)]

    def get_blueprint(self):
        app = super().get_blueprint()
        RequestHandler.add_post_request(app, '/request/admin_login', self.admin_login)
        RequestHandler.add_post_request(app, '/request/admin_logout', self.admin_logout)
        return app


class AdminManager:
    ADMIN_COOKIE_LIFETIME = 3600  # 1 hour

    PASSWORD_SALT_BYTES_SIZE = 64

    def __init__(self, key, db):
        self.cookie_manager = CookieManager(key, 'moderator', {'mod_id', 'expires'})
        admin_creds = AdminManager._get_admin_creds(db)
        if admin_creds is None or len(admin_creds[1]) != AdminManager.PASSWORD_SALT_BYTES_SIZE:
            print('Admin password is not set or it is set incorrectly. Please set one now.')
            self.salt = os.urandom(AdminManager.PASSWORD_SALT_BYTES_SIZE)
            self.digest = self._get_digest(AdminManager._prompt_for_password())
            AdminManager._set_admin_creds(db, self.digest, self.salt)
        else:
            self.digest, self.salt = admin_creds

    def _get_digest(self, password):
        return hashlib.pbkdf2_hmac('sha256', password.encode('ascii'), self.salt, 100000)

    def authenticate(self, username, password):
        return username == 'admin' and self.digest == self._get_digest(password)

    def set_cookie(self, response):
        expires = time.time() + AdminManager.ADMIN_COOKIE_LIFETIME
        response.set_cookie(*self.cookie_manager.encode(mod_id='admin', expires=expires))

    def unset_cookie(self, response):
        response.set_cookie(self.cookie_manager.cookie_name, '', expires=0)

    @staticmethod
    def _validate_timestamp(timestamp):
        return type(timestamp) == float and time.time() <= timestamp

    def validate_cookie(self, cookie_jar):
        data = self.cookie_manager.decode(cookie_jar)
        if data is None or not AdminManager._validate_timestamp(data.get('expires')):
            return False
        return True

    @staticmethod
    def _get_admin_creds(db):
        result = db.execute('SELECT digest, salt FROM admin_credentials')
        return None if len(result) == 0 else result[0]

    @staticmethod
    def _set_admin_creds(db, digest, salt):
        db.execute('DELETE FROM admin_credentials')
        db.execute('INSERT INTO admin_credentials VALUES (?, ?)', (digest, salt))
        db.commit()

    @staticmethod
    def _prompt_for_password():
        attempt_1 = getpass.getpass("Set admin password: ")
        attempt_2 = getpass.getpass("Set admin password: ")
        if attempt_1 is None or attempt_1 != attempt_2:
            print('Passwords do not match. Try again:')
            return AdminManager._prompt_for_password()
        return attempt_1
