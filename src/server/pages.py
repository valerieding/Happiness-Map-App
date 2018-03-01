from flask import Blueprint, render_template, request

from constants import TEMPLATE_FOLDER


class PageRequests:
    HOMEPAGE = {'path': '/map.html'}

    PAGES = ['/about', '/board', '/map', '/moderator', '/stats', '/vote']

    ADMIN_AWARE_PAGES = {'/board', '/moderator'}

    PAGES_WITH_POST = {'/vote'}

    def __init__(self, admin):
        self.admin = admin

    @staticmethod
    def serve_page(path):
        return render_template(path)

    def serve_admin_aware_page(self, path):
        return render_template(path, is_moderator=self.admin.validate_cookie(request.cookies))

    def get_blueprint(self):
        app = Blueprint('static', __name__, template_folder=TEMPLATE_FOLDER)
        app.add_url_rule(rule='/', view_func=self.serve_page, defaults=PageRequests.HOMEPAGE)
        app.add_url_rule(rule='/index.html', view_func=self.serve_page, defaults=PageRequests.HOMEPAGE)
        for domain in PageRequests.PAGES:
            view_func = self.serve_admin_aware_page if domain in PageRequests.ADMIN_AWARE_PAGES else self.serve_page
            methods = ['GET'] if domain in PageRequests.PAGES_WITH_POST else ['GET', 'POST']
            app.add_url_rule(rule=domain, view_func=view_func, methods=methods, defaults={'path': domain + '.html'})
        return app
