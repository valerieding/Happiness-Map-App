import logging
import time

from constants import ALLOWED_REACTIONS_TO_POST
from server.util.wrappers import Message


class MessageAPI:
    """Handles database requests relating to message posts. """

    REACTION_COLS = ', '.join(
        'COUNT(CASE WHEN post_votes.reaction = {} THEN 1 END) {}s'.format(value, name) for value, name in
        enumerate(ALLOWED_REACTIONS_TO_POST))

    def __init__(self, database):
        self.database = database
        self.logger = logging.getLogger('MessageAPI')

    def _get_posts(self, filter, ordering):
        return Message.from_tuple_array(self.database.execute(
            """
            SELECT * FROM (
                (SELECT * FROM posts WHERE {}) post
                    LEFT OUTER JOIN 
                (SELECT postID, {} FROM post_votes GROUP BY postID) reaction
                    ON post.id = reaction.postID
            ) ORDER BY {}
            """.format(filter.conditions, MessageAPI.REACTION_COLS, ordering), (*filter.arguments,)))

    def get_recent_posts(self, filter):
        """Retrieves the messages posted between `start_time` and `end_time` around `location`. """
        return self._get_posts(filter, 'timestamp DESC')

    def get_trending_posts(self, filter):
        """Retrieves the trending messages posted around `location`. """
        return self._get_posts(filter, 'IFNULL(upvotes - downvotes, 0) DESC, timestamp DESC')

    def add_post(self, uid, message, reply_to=None):
        """Adds a `message` by `uid` posted at `location`. """

        # Try to find most recent vote_id that corresponds to the given uid
        vote = self.database.execute("""SELECT id, score, latitude, longitude, logical_loc FROM votes
                                        WHERE uid = ? ORDER BY timestamp DESC LIMIT 1""", (uid,))
        if len(vote) != 1:
            return False
        vote_id, happiness_level = vote[0][:2]

        self.database.execute("""INSERT INTO posts values  (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                              (vote_id, reply_to, uid, message, happiness_level, time.time(), *vote[0][2:]))
        self.database.commit()
        return True

    def add_reaction(self, uid, post_id, reaction):
        """Adds a reaction to `post_id` by `uid`. """
        if uid is None:
            return False
        try:
            self.database.acquire_lock(uid)
            self.database.execute("DELETE FROM post_votes WHERE postID = ? AND uid = ?", (post_id, uid))
            self.database.execute("INSERT INTO post_votes VALUES (?, ?, ?)", (post_id, uid, reaction))
            self.database.commit()
            return True
        except:
            return False
        finally:
            self.database.release_lock(uid)

    def remove_post(self, post_id):
        """Removes the post with `post_id`. Should only be accessible to admins. """
        self.database.execute("DELETE FROM posts WHERE id = ?", (post_id,))
        self.database.execute("DELETE FROM post_votes WHERE postID = ?", (post_id,))
        self.database.commit()
