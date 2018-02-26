import logging

from flask import Blueprint, request, jsonify


class RequestHandler:

    def __init__(self, user_manager):
        self.logger = logging.getLogger(self.__class__.__name__)
        self.user_manager = user_manager

    def view_builder(self, FormValidator, handle):
        requires_valid_user_id = 'user_id' in handle.__code__.co_varnames
        return lambda: self.generate_response(FormValidator, handle, requires_valid_user_id)

    def get_routes(self):
        """Returns a list of (request handler method, form validator) that the class should handle. """
        raise NotImplementedError("Class {} should override this method.".format(self.__class__))

    def get_blueprint(self):
        app = Blueprint(self.__class__.__name__, __name__)
        for handle, FormValidator in self.get_routes():
            rule = '/request/{}'.format(handle.__name__)
            app.add_url_rule(rule=rule, endpoint=rule, view_func=self.view_builder(FormValidator, handle), methods=['POST'])
        return app

    def generate_response(self, FormValidator, response_generator, requires_valid_user_id=False):
        """
        Validates the flask request form with `FormValidator` and returns 'Invalid request' if invalid or JSONifies the
        output of `response_generator`. If `requires_valid_uer_id` is set to True and a user_id cookie is not set, then
        it will generate a new user cookie.
        """
        form = FormValidator(request.form)
        cookie = None

        kwargs = {'form': form}
        user = self.user_manager.get_user(request.cookies)
        if requires_valid_user_id:
            if user is None:
                user, cookie = self.user_manager.new_user()
            kwargs['user_id'] = user

        request_form_rep = '{}{}'.format(FormValidator.__name__, list(request.form.items()))

        self.logger.info('User {} requested {}'.format(user, request_form_rep))
        if not form.validate():
            self.logger.warning('Invalid request from user {}: {}:\n\t{}'.format(user, request_form_rep, form.errors))
            return jsonify('Invalid request', 400)

        try:
            response = jsonify(response_generator(**kwargs))
            if cookie:
                response.set_cookie(*cookie)
            return response
        except Exception as e:
            self.logger.exception(e)
            return jsonify('Invalid request: bad output', 400)
