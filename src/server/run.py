import logging

import flask

from constants import STATIC_FOLDER, DATABASE_FILE, SIGNATURE_KEY_FILE
from server.database.database import DatabaseManager
from server.admin import AdminRequests
from server.database.message_api import MessageAPI
from server.database.voting_api import VotingAPI
from server.messages.requests import MessageRequests
from server.pages import page_server
from server.util.users import UserManager
from server.voting.requests import VotingRequests

_db = DatabaseManager(DATABASE_FILE)
messageAPI = MessageAPI(_db)
votingAPI = VotingAPI(_db)
user_manager = UserManager(SIGNATURE_KEY_FILE, _db)


def get_flask_app(has_admin_privileges=False):
    class DictBasedJSONEncoder(flask.json.JSONEncoder):
        """Defaults to the dict representation of classes for convenience. """

        def default(self, o):
            return o.__dict__

    app = flask.Flask(__name__, static_folder=STATIC_FOLDER)
    app.register_blueprint(MessageRequests(messageAPI, user_manager).get_blueprint())
    app.register_blueprint(VotingRequests(votingAPI, user_manager).get_blueprint())
    app.register_blueprint(page_server)
    if has_admin_privileges:
        app.register_blueprint(AdminRequests(messageAPI, user_manager).get_blueprint())
    # Allow the smooth JSONification of objects
    app.json_encoder = DictBasedJSONEncoder
    # Allow trailing slashes in all URLs.
    app.url_map.strict_slashes = False
    return app


def run_server(host, port, activate_admin, log_file, debug):
    if activate_admin:
        # Running the server publicly with admin privileges is banned.
        host = 'localhost'
    logging.basicConfig(format='[%(asctime)s] %(levelname)-8s [%(filename)s:%(lineno)d] %(message)s', filename=log_file,
                        level=logging.DEBUG if debug else logging.INFO)
    get_flask_app(activate_admin).run(host=host, port=port, debug=debug)
