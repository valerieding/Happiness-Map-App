import logging

import flask

from server.messages.requests import message_requests
from server.static import static_server
from server.voting.requests import voting_requests


def run_server(host, port, log_file, debug):
    logging.basicConfig(format='[%(asctime)s] %(levelname)-8s [%(filename)s:%(lineno)d] %(message)s', filename=log_file,
                        level=logging.DEBUG if debug else logging.INFO)

    app = flask.Flask(__name__)
    app.register_blueprint(static_server)
    app.register_blueprint(message_requests)
    app.register_blueprint(voting_requests)
    app.run(host=host, port=port, debug=debug)
