from os.path import abspath, dirname, join


"""The root folder of server source files. """
WEBSITE_ROOT_FOLDER = dirname(abspath(__file__))

"""Folder containing all webpage templates. """
TEMPLATE_FOLDER = join(WEBSITE_ROOT_FOLDER, 'site')

"""The root folder of statically served files. """
STATIC_FOLDER = join(WEBSITE_ROOT_FOLDER, 'static')

"""The root folder for data files. """
_DATA_FOLDER = join(WEBSITE_ROOT_FOLDER, 'server', 'data')

DATABASE_FILE = join(_DATA_FOLDER, 'happiness_map.db')

POPULATE_DB_FILE = join(_DATA_FOLDER, 'initial_content.json')

TABLE_TEMPLATE_FILE = join(_DATA_FOLDER, 'table_templates.sql')

LOG_FILE = join(_DATA_FOLDER, 'log.txt')

SIGNATURE_KEY_FILE = join(_DATA_FOLDER, 'uid_key.pem')

ALLOWED_REACTIONS_TO_POST = ['upvote', 'downvote']
