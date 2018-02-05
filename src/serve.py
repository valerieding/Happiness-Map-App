import flask

import server.queries
import server.static

if __name__ == '__main__':
    app = flask.Flask(__name__)
    app.register_blueprint(server.queries.app)
    app.register_blueprint(server.static.app)
    app.run(host='localhost', debug=True, port=8000)
