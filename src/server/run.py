import logging

from flask import Flask, json

from constants import STATIC_FOLDER, DATABASE_FILE, SIGNATURE_KEY_FILE, POPULATE_DB_FILE
from server.admin import AdminRequests
from server.database.database import DatabaseManager
from server.database.message_api import MessageAPI
from server.database.voting_api import VotingAPI
from server.messages.requests import MessageRequests
from server.pages import page_server
from server.util.users import UserManager
from server.voting.requests import VotingRequests


class FlaskAppContext:
    class DictBasedJSONEncoder(json.JSONEncoder):
        """Defaults to the dict representation of classes for convenience. """

        def default(self, o):
            return o.__dict__

    def __init__(self, debug):
        self.db = DatabaseManager(DATABASE_FILE)
        if debug:
            self.db = DatabaseManager(':memory:')
            self.db.load_from_json(POPULATE_DB_FILE)

        self.messageAPI = MessageAPI(self.db)
        self.votingAPI = VotingAPI(self.db)
        self.user_manager = UserManager(SIGNATURE_KEY_FILE, self.db)

    def get(self, has_admin_privileges):
        app = Flask(__name__, static_folder=STATIC_FOLDER)
        app.register_blueprint(MessageRequests(self.messageAPI, self.user_manager).get_blueprint())
        app.register_blueprint(VotingRequests(self.votingAPI, self.user_manager).get_blueprint())
        app.register_blueprint(page_server)

        if has_admin_privileges:
            app.register_blueprint(AdminRequests(self.messageAPI, self.user_manager).get_blueprint())

        # Allow the smooth JSONification of objects
        app.json_encoder = FlaskAppContext.DictBasedJSONEncoder
        # Allow trailing slashes in all URLs.
        app.url_map.strict_slashes = False
        return app


def run_server(host, port, activate_admin, log_file, debug):
    if activate_admin:
        # Running the server publicly with admin privileges is banned.
        host = 'localhost'
    logging.basicConfig(format='[%(asctime)s] %(levelname)-8s [%(filename)s:%(lineno)d] %(message)s', filename=log_file,
                        level=logging.DEBUG if debug else logging.INFO)
    FlaskAppContext(debug).get(activate_admin).run(host=host, port=port, debug=debug)
