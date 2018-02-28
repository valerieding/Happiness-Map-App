from http import HTTPStatus

import time
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
        self.admin_manager.unset_admin_cookie()
        return '', HTTPStatus.ACCEPTED

    def get_routes(self):
        return [(self.remove_post, RemovePostForm)]

    def get_blueprint(self):
        app = super().get_blueprint()
        RequestHandler.add_post_request(app, '/request/admin_login', self.admin_login)
        RequestHandler.add_post_request(app, '/request/admin_login', self.admin_login)
        return app


class AdminManager:

    ADMIN_COOKIE_LIFETIME = 3600  # 1 hour

    def __init__(self, key, db):
        self.cookie_manager = CookieManager(key, 'moderator', {'mod_id', 'expires'})
        self.db = db

    def authenticate(self, username, password):
        # TODO[SECURITY]: implement properly
        return username == 'admin' and password == 'correct horse battery staple'

    def set_cookie(self, response):
        expires = time.time() + AdminManager.ADMIN_COOKIE_LIFETIME
        response.set_cookie(*self.cookie_manager.encode(mod_id='admin', expires=expires), expires=expires)

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
