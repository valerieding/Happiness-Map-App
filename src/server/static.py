import os

from flask import Blueprint

from src import WEBSITE_ROOT_FOLDER

static_server = Blueprint('static', __name__, static_folder=WEBSITE_ROOT_FOLDER)


@static_server.route('/')
@static_server.route('/index.html')
def serve_main_page():
    return static_server.send_static_file('index.html')


@static_server.route('/nav.html')
def serve_nav():
    return static_server.send_static_file('nav.html')


@static_server.route('/board', defaults={'root': 'board', 'filename': 'index.html'})
@static_server.route('/map', defaults={'root': 'map', 'filename': 'index.html'})
@static_server.route('/stats', defaults={'root': 'stats', 'filename': 'index.html'})
@static_server.route('/vote', defaults={'root': 'vote', 'filename': 'index.html'})
@static_server.route('/board/<filename>', defaults={'root': 'board'})
@static_server.route('/map/<filename>', defaults={'root': 'map'})
@static_server.route('/stats/<filename>', defaults={'root': 'stats'})
@static_server.route('/vote/<filename>', defaults={'root': 'vote'})
@static_server.route('/lib/<filename>', defaults={'root': 'lib'})
@static_server.route('/styles/<filename>', defaults={'root': 'styles'})
@static_server.route('/scripts/<filename>', defaults={'root': 'scripts'})
def serve_static_files(root, filename):
    return static_server.send_static_file(root + '/' + filename)
    # return app.send_static_file(os.path.join(root, filename))  TODO: figure out why this does not work
