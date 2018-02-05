from db.database import DatabaseManager
from db.message_api import MessageAPI
from db.voting_api import VotingAPI
from flask import Blueprint, request

from src import DATABASE_FILE
from src import WEBSITE_ROOT_FOLDER

app = Blueprint('queries', __name__, static_folder=WEBSITE_ROOT_FOLDER)

db = DatabaseManager(DATABASE_FILE)
messageAPI = MessageAPI(db)
votingAPI = VotingAPI(db)


@app.route('/query/add_vote', methods=['POST'])
def add_vote():
    pass

