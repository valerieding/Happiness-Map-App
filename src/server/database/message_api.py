import logging
import time
from sqlite3 import IntegrityError

from constants import ALLOWED_REACTIONS_TO_POST
from server.util import Message


class MessageAPI:
    """Handles database requests relating to message posts. """

    # TODO: make use of localization throughout the MessageAPI interface.

    REACTION_COLS = ', '.join(
        'COUNT(CASE WHEN post_votes.reaction = {} THEN 1 END) {}s'.format(value, name) for value, name in
        enumerate(ALLOWED_REACTIONS_TO_POST))

    POST_ID_MAX = 2 ** 32

    def __init__(self, database):
        self.database = database
        self.logger = logging.getLogger('MessageAPI')

    def get_recent_posts(self, filter):
        """Retrieves the messages posted between `start_time` and `end_time` around `location`. """
        # a row for each reaction a post has, and whether it's an upvote or downvote
        return Message.from_tuple_array(self.database.execute(
            """SELECT * FROM 
                ((SELECT * FROM posts WHERE {}) t1 LEFT OUTER JOIN 
                (SELECT postID, {}
                FROM post_votes
                GROUP BY postID) t2 ON t1.id = t2.postID) 
                ORDER BY timestamp DESC""".format(filter.conditions, MessageAPI.REACTION_COLS), (*filter.arguments,)))

    def get_trending_posts(self, filter):
        """Retrieves the trending messages posted around `location`. """
        return Message.from_tuple_array(self.database.execute(
            """SELECT * FROM 
                ((SELECT * FROM posts WHERE {}) t1 LEFT OUTER JOIN 
                (SELECT postID, {}
                FROM post_votes
                GROUP BY postID) t2 ON t1.id = t2.postID) 
                ORDER BY IFNULL(upvotes - downvotes, 0) DESC, timestamp DESC""".format(filter.conditions, MessageAPI.REACTION_COLS), (*filter.arguments,)))

    def add_post(self, uid, message, reply_to=None):
        """Adds a `message` by `uid` posted at `location`. """

        # Try to find most recent vote_id that corresponds to the given uid
        vote = self.database.execute("""SELECT id, score, latitude, longitude, logical_loc FROM votes
                                        WHERE uid = ? ORDER BY timestamp DESC LIMIT 1""", (uid,))
        if len(vote) != 1:
            return False
        vote_id, happiness_level = vote[0][:2]

        self.database.execute("""INSERT INTO posts values  (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                              (vote_id, reply_to, uid, message, happiness_level, time.time(),
                               *vote[0][2:]))
        self.database.commit()
        return True

    def add_reaction(self, uid, post_id, reaction):
        """Adds a reaction to `post_id` by `uid`. """
        existent_reaction = self.database.execute("SELECT reaction FROM post_votes WHERE postID = ? AND uid = ? "
                                                  "ORDER BY postID DESC LIMIT 1", (post_id, uid))
        existent_reaction = existent_reaction[0][0] if len(existent_reaction) != 0 else None

        # If the user has already posted this exact reaction before, disallow a new one.
        if uid is None or reaction == existent_reaction:
            return False

        # Delete the previous reaction
        if existent_reaction is not None:
            self.database.execute("DELETE FROM post_votes WHERE postID = ? AND uid = ?", (post_id, uid))
        # Add the new reaction
        self.database.execute("INSERT INTO post_votes VALUES (?, ?, ?)", (post_id, uid, reaction))
        self.database.commit()
        return True

    def remove_post(self, post_id):
        """Removes the post with `post_id`. Should only be accessible to admins. """
        self.database.execute("DELETE FROM posts WHERE id = ?", (post_id,))
        self.database.execute("DELETE FROM post_votes WHERE postID = ?", (post_id,))
        self.database.commit()
