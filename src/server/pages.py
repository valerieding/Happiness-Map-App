from flask import Blueprint, render_template

from constants import WEBSITE_ROOT_FOLDER

page_server = Blueprint('static', __name__, template_folder=WEBSITE_ROOT_FOLDER)

HOMEPAGE = {'route': 'map', 'path': 'index.html'}


@page_server.route('/', defaults=HOMEPAGE)
@page_server.route('/index.html', defaults=HOMEPAGE)
@page_server.route('/nav.html', defaults={'route': '.', 'path': 'nav.html'})
@page_server.route('/about', defaults={'route': 'about'})
@page_server.route('/about/<path:path>', defaults={'route': 'about'})
@page_server.route('/board', defaults={'route': 'board'})
@page_server.route('/board/<path:path>', defaults={'route': 'board'})
@page_server.route('/map', defaults={'route': 'map'})
@page_server.route('/map/<path:path>', defaults={'route': 'map'})
@page_server.route('/stats', defaults={'route': 'stats'})
@page_server.route('/stats/<path:path>', defaults={'route': 'stats'})
@page_server.route('/vote', defaults={'route': 'vote'}, methods=['GET', 'POST'])
@page_server.route('/vote/<path:path>', defaults={'route': 'vote'})
def serve_pages(route, path='index.html'):
    return render_template(route + '/' + path)
