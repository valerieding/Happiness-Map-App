from db.database import DatabaseManager
from db.location import Location
from db.message_api import MessageAPI
from db.voting_api import VotingAPI
from flask import Blueprint, request

from server.voting_forms import AddVoteForm
from src import DATABASE_FILE
from src import WEBSITE_ROOT_FOLDER

app = Blueprint('queries', __name__, static_folder=WEBSITE_ROOT_FOLDER)

db = DatabaseManager(DATABASE_FILE)
messageAPI = MessageAPI(db)
votingAPI = VotingAPI(db)


@app.route('/query/add_vote', methods=['POST'])
def add_vote():
    form = AddVoteForm()
    print(request.form)
    if form.validate() and votingAPI.add_vote(request.form['userID'], Location.from_request(request.form), request.form['happiness_level']):
        return 'Success'
    print("FAILURE")
    return 'Fail\n'
