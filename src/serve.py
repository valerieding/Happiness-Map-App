import flask
import logging

import server.queries
import server.static

# Improve logging format. TODO: set log file
logging.basicConfig(format='[%(asctime)s] %(filename)10s:%(funcName)s:%(lineno)s: %(message)s', level=logging.DEBUG)


if __name__ == '__main__':
    app = flask.Flask(__name__)
    app.register_blueprint(server.queries.app)
    app.register_blueprint(server.static.app)
    app.run(host='localhost', debug=True, port=8000)
