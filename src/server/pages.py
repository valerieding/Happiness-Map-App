from flask import Blueprint, render_template, request

from constants import WEBSITE_ROOT_FOLDER


class PageRequests:
    HOMEPAGE = {'route': 'map'}

    REGULAR_PAGES = ['about', 'map', 'stats', 'vote']

    ADMIN_AWARE_PAGES = ['board', 'moderator']

    PAGES_WITH_POST = {'vote'}

    def __init__(self, admin):
        self.admin = admin

    @staticmethod
    def serve_page(route, path='/index.html'):
        return render_template(route + path)

    def serve_admin_aware_page(self, route):
        return render_template(route + '/index.html', is_moderator=self.admin.validate_cookie(request.cookies))

    @staticmethod
    def add_route(app, route, view_func):
        methods = ['GET'] if route in PageRequests.PAGES_WITH_POST else ['GET', 'POST']
        for rule in ['/{}'.format(route), '/{}/index.html'.format(route)]:
            app.add_url_rule(rule=rule, view_func=view_func, methods=methods, defaults={'route': route})

    def get_blueprint(self):
        app = Blueprint('static', __name__, template_folder=WEBSITE_ROOT_FOLDER)
        app.add_url_rule(rule='/', view_func=self.serve_page, defaults=PageRequests.HOMEPAGE)
        app.add_url_rule(rule='/index.html', view_func=self.serve_page, defaults=PageRequests.HOMEPAGE)
        app.add_url_rule(rule='/nav.html', view_func=self.serve_page, defaults={'route': '', 'path': '/nav.html'})
        for domain in PageRequests.REGULAR_PAGES:
            PageRequests.add_route(app, domain, self.serve_page)
        for domain in PageRequests.ADMIN_AWARE_PAGES:
            PageRequests.add_route(app, domain, self.serve_admin_aware_page)
        return app
