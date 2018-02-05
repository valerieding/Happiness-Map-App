import os

from flask import Blueprint
from src import WEBSITE_ROOT_FOLDER

app = Blueprint('static', __name__, static_folder=WEBSITE_ROOT_FOLDER)


@app.route('/')
@app.route('/index.html')
def serve_main_page():
    return app.send_static_file('index.html')


@app.route('/nav.html')
def serve_nav():
    return app.send_static_file('nav.html')


@app.route('/board', defaults={'root': 'board', 'filename': 'index.html'})
@app.route('/map', defaults={'root': 'map', 'filename': 'index.html'})
@app.route('/stats', defaults={'root': 'stats', 'filename': 'index.html'})
@app.route('/vote', defaults={'root': 'vote', 'filename': 'index.html'})
@app.route('/board/<filename>', defaults={'root': 'board'})
@app.route('/map/<filename>', defaults={'root': 'map'})
@app.route('/stats/<filename>', defaults={'root': 'stats'})
@app.route('/vote/<filename>', defaults={'root': 'vote'})
@app.route('/lib/<filename>', defaults={'root': 'lib'})
@app.route('/styles/<filename>', defaults={'root': 'styles'})
@app.route('/scripts/<filename>', defaults={'root': 'scripts'})
def serve_static_files(root, filename):
    return app.send_static_file(os.path.join(root, filename))