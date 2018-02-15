import logging

import flask

from constants import STATIC_FOLDER
from server.messages.requests import message_requests
from server.pages import page_server
from server.voting.requests import voting_requests


def get_flask_app():
    class DictBasedJSONEncoder(flask.json.JSONEncoder):
        """Defaults to the dict representation of classes for convenience. """

        def default(self, o):
            return o.__dict__

    app = flask.Flask(__name__, static_folder=STATIC_FOLDER)
    app.register_blueprint(page_server)
    app.register_blueprint(message_requests)
    app.register_blueprint(voting_requests)
    # Allow the smooth JSONification of objects
    app.json_encoder = DictBasedJSONEncoder
    # Allow trailing slashes in all URLs.
    app.url_map.strict_slashes = False
    return app


def run_server(host, port, log_file, debug):
    logging.basicConfig(format='[%(asctime)s] %(levelname)-8s [%(filename)s:%(lineno)d] %(message)s', filename=log_file,
                        level=logging.DEBUG if debug else logging.INFO)
    get_flask_app().run(host=host, port=port, debug=debug)
