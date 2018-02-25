import logging
import time
from sqlite3 import IntegrityError

from server.util import Voting


class VotingAPI:
    """Handles database requests relating to happiness votes. """

    """Time limit in seconds between two votes by the same person."""
    VOTE_TIMEOUT = 600  # Ten minutes

    def __init__(self, database):
        self.database = database
        self.logger = logging.getLogger('VotingAPI')

    def get_recent_votes(self, filter):
        """Retrieves the user's most recent votes at the logical location, between start and end time. """
        return Voting.from_tuple_array(self.database.execute(
            """SELECT timestamp, score, latitude, longitude, logical_loc, address FROM votes
               WHERE {} ORDER BY timestamp DESC""".format(filter.conditions), (*filter.arguments,)))

    def get_votes_by(self, filter, agg):
        results = self.database.execute(
            "SELECT {}avg(score) FROM votes WHERE {} {}".format(agg.expr, filter.conditions, agg.group_by),
            (*filter.arguments,))
        if len(results) == 0 or len(results[0]) == 2:
            return {label: score for label, score in results}
        return results[0][0]

    def add_vote(self, uid, location, happiness_level):
        """
        Adds a happiness vote of `happiness_level` at `location` from `uid` to the database. If `uid` has already voted
        in the last `VOTE_TIMEOUT` seconds, that vote is then changed to have this happiness level.
        """

        # TODO: use user-specific locks around here (provided by the DatabaseManager).
        try:
            self.database.execute("DELETE FROM votes WHERE uid = ? AND timestamp >= ?",
                                  (uid, time.time() - VotingAPI.VOTE_TIMEOUT))
            self.database.execute("INSERT INTO votes values (NULL, ?, ?, ?, ?, ?, ?, ?)",
                                  (uid, time.time(), happiness_level, location.latitude, location.longitude,
                                   location.logical_location, location.address))
            self.database.commit()
            return True
        except IntegrityError as e:
            self.logger.exception(e)
            return False

    def get_happiness_level(self, uid):
        """ Returns the most recent happiness level registered for `uid`. """

        votes = self.database.execute("SELECT score FROM votes WHERE uid = ? ORDER BY timestamp DESC LIMIT 1", (uid,))
        return votes[0][0] if len(votes) != 0 else None
