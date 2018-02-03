from random import randint
import time

class MessageAPI:
    """Handles database requests relating to message posts. """

    POST_ID_MAX = 2 ** 32

    def __init__(self, database):
        self.database = database;

    def get_recent_posts(self, location, start_time, end_time):
        """Retrieves the messages posted between `start_time` and `end_time` around `location`. """
        # TODO: define what "around" means: right now, just returns all posts, sorted by timestamp
        return self.database.execute("SELECT * FROM posts WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp DESC", (start_time, end_time))

    def get_trending_posts(self, location):
        """Retrieves the trending messages posted around `location`. """
        return self.database.execute("SELECT * FROM posts WHERE timestamp ORDER BY upvotes DESC")

    def get_posts(self, filter):
        # TODO: figure out what this should do. Is filter a generic predicate on Posts?
        pass

    def add_post(self, uid, location, message):
        """Adds a `message` by `uid` posted at `location`. """
        # Generate a random, unused post_ID
        post_id = randint(0, MessageAPI.POST_ID_MAX)
        while len(self.database.execute("SELECT id FROM posts WHERE id = ? LIMIT 1", (post_id,))) != 0:
            post_id = randint(0, MessageAPI.POST_ID_MAX)
        # Find most recent vote_id that corresponds to the given uid
        vote = self.database.execute("SELECT * FROM votes WHERE uid = ? ORDER BY timestamp DESC LIMIT 1", (uid,))
        vote_id = vote[0][0]
        happiness_level = vote[0][3]
        self.database.execute("""INSERT INTO posts values  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                              (post_id, vote_id, None, uid, message, happiness_level, 0, 0, time.time(),
                               location.latitude, location.longitude, location.logical_location))
        self.database.commit()

    def upvote(self, uid, post_id):
        """Adds an upvote to `post_id` by `uid`. """
        num_upvotes = self.database.execute("SELECT upvotes FROM posts WHERE id = ?", (post_id,))[0][6]
        self.database.execute("INSERT INTO post_votes values (?, ?, ?)", (post_id, uid, True))
        self.database.execute("UPDATE posts SET upvotes = ? WHERE id = ?", (num_upvotes + 1, post_id))
        self.database.commit()

    def downvote(self, uid, post_id):
        """Adds a downvote to `post_id` by `uid`. """
        num_downvotes = self.database.execute("SELECT downvotes FROM posts WHERE id = ?", (post_id,))[0][7]
        self.database.execute("INSERT INTO post_votes values (?, ?, ?)", (post_id, uid, False))
        self.database.execute("UPDATE posts SET downvotes = ? WHERE id = ?", (num_downvotes + 1, post_id))
        self.database.commit()

    def remove_post(self, post_id):
        """Removes the post with `post_id`. Should only be accessible to admins. """
        self.database.execute("DELETE FROM posts WHERE id = ?", (post_id,))
























