from http import HTTPStatus

from flask import request, redirect, make_response

from server.moderator.forms import *
from server.util.request_handler import RequestHandler


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
