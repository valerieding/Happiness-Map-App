import os

WEBSITE_ROOT_FOLDER = os.path.dirname(os.path.abspath(__file__))

STATIC_FOLDER = os.path.join(WEBSITE_ROOT_FOLDER, 'static')

DATABASE_FILE = os.path.join(WEBSITE_ROOT_FOLDER, "server", "data", "happiness_map.db")

TABLE_TEMPLATE_FILE = os.path.join(WEBSITE_ROOT_FOLDER, "server", "data", "table_templates.sql")

LOG_FILE = os.path.join(WEBSITE_ROOT_FOLDER, "server", "data", "log.txt")

ALLOWED_REACTIONS_TO_POSTS = ['upvote', 'downvote']
