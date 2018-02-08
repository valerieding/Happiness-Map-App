import os

WEBSITE_ROOT_FOLDER = os.path.dirname(os.path.abspath(__file__))

DATABASE_FILE = os.path.join(WEBSITE_ROOT_FOLDER, "server", "data", "happiness_map.db")

TABLE_TEMPLATE_FILE = os.path.join(WEBSITE_ROOT_FOLDER, "server", "data", "table_templates.sql")

LOG_FILE = os.path.join(WEBSITE_ROOT_FOLDER, "server", "data", "log.txt")