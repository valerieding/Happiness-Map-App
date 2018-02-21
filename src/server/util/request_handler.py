import logging

from flask import Blueprint, request, jsonify

from server.util.users import UserID


class RequestHandler:

    def __init__(self):
        self.logger = logging.getLogger(self.__class__.__name__)

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

        kwargs = {'form': form}
        user = UserID.from_cookie(request.cookies)
        need_to_send_new_id = False
        if requires_valid_user_id:
            if user is None:
                need_to_send_new_id = True
                user = UserID.issue()
            kwargs['user_id'] = user.user_id

        request_form_rep = '{}{}'.format(FormValidator.__name__, list(request.form.items()))

        self.logger.info('User {} requested {}'.format(user, request_form_rep))
        if not form.validate():
            self.logger.warning('Invalid request from user {}: {}:\n\t{}'.format(user, request_form_rep, form.errors))
            return jsonify('Invalid request')

        response = jsonify(response_generator(**kwargs))
        if need_to_send_new_id:
            user.save_cookie(response)
        return response
