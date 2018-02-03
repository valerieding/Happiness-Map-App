import sqlite3

DATABASE_FILE = "happiness_map.db"


class DatabaseManager:
    """"""

    TABLE_TEMPLATE_FILE = "table_templates.sql"

    def __init__(self, database_file):
        self.connection = sqlite3.connect(database_file)
        self.cursor = self.connection.cursor()
        self.cursor.executescript(open(DatabaseManager.TABLE_TEMPLATE_FILE, 'r').read())

    def execute(self, command, *args):
        self.cursor.execute(command, *args)
        return self.cursor.fetchall()

    def commit(self):
        self.connection.commit()

    def __del__(self):
        self.cursor.close()
        self.connection.close()

if __name__ == '__main__':
    db = DatabaseManager(DATABASE_FILE)
    db.execute("INSERT INTO posts (id, voteID, uid, message, upvotes, downvotes, timestamp) values (1, 2, 3, 'hi', 0, 0, 124376)")
    db.execute("INSERT INTO post_votes (postID, uid, isUpvote) values (1, 100, 1)")
    db.execute("INSERT INTO post_votes (postID, uid, isUpvote) values (1, 100, 1)")
    db.execute("INSERT INTO post_votes (postID, uid, isUpvote) values (1, 100, 1)")
    # db.execute("INSERT INTO votes (id, uid, timestamp, score) VALUES (123, 56, 784445, 3)")
    print(db.execute("SELECT * FROM post_votes"))
    db.commit()
