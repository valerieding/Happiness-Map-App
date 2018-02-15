import logging
import time

from random import randint
from sqlite3 import IntegrityError

from server.util import Message


class MessageAPI:
    """Handles database requests relating to message posts. """

    POST_ID_MAX = 2 ** 32

    def __init__(self, database):
        self.database = database
        self.logger = logging.getLogger('MessageAPI')

    def get_recent_posts(self, location, start_time, end_time):
        """Retrieves the messages posted between `start_time` and `end_time` around `location`. """
        # TODO: define what "around" means: right now, just returns all posts, sorted by timestamp, ignores location
        # TODO: this needs to be a class in order to jsonify it nicely
        return Message.from_tuple_array(self.database.execute(
            "SELECT * FROM posts WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp DESC", (start_time, end_time)))

    def get_trending_posts(self, location):
        """Retrieves the trending messages posted around `location`. """
        # TODO: define what "around" means: right now, just returns all posts sorted by net upvote count
        return Message.from_tuple_array(self.database.execute(
            "SELECT * FROM posts WHERE timestamp ORDER BY (upvotes - downvotes) DESC, timestamp DESC"))

    def add_post(self, uid, location, message, reply_to=None):
        """Adds a `message` by `uid` posted at `location`. """

        # Try to find most recent vote_id that corresponds to the given uid
        vote = self.database.execute("SELECT id,score FROM votes WHERE uid = ? ORDER BY timestamp DESC LIMIT 1", (uid,))
        if len(vote) != 1:
            return False
        vote_id, happiness_level = vote[0]

        try:
            self.database.execute("""INSERT INTO posts values  (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                                  (vote_id, reply_to, uid, message, happiness_level, 0, 0, time.time(),
                                   location.latitude, location.longitude, location.logical_location))
            self.database.commit()
            return True
        except IntegrityError as e:
            self.logger.exception(e)
            return False

    def add_reaction(self, uid, post_id, reaction):
        """Adds an upvote to `post_id` by `uid`. """
        # Check if this user has already upvoted this post
        # TODO: this needs a lock
        try:
            self.database.execute("DELETE FROM post_votes WHERE postID = ? AND uid = ?", (post_id, uid))
            self.database.execute("INSERT INTO post_votes VALUES (?, ?, ?)", (post_id, uid, reaction))
            if reaction == 1:
                self.database.execute("UPDATE posts SET downvotes = downvotes + 1 WHERE id = ?", (post_id,))
            else:
                self.database.execute("UPDATE posts SET upvotes = upvotes + 1 WHERE id = ?", (post_id,))
            self.database.commit()
            return True
        except IntegrityError as e:
            self.logger.exception(e)
            return False

    # TODO: activate this
    '''
    def remove_post(self, post_id):
        """Removes the post with `post_id`. Should only be accessible to admins. """
            self.database.execute("DELETE FROM posts WHERE id = ?", (post_id,))
            self.database.commit()
    '''
