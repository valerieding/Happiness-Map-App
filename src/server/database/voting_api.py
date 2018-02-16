import logging
import time
from sqlite3 import IntegrityError

from server.util import HeatMapPoint


class VotingAPI:
    """Handles database requests relating to happiness votes. """

    """Time limit in seconds between two votes by the same person."""
    VOTE_TIMEOUT = 600  # Ten minutes

    def __init__(self, database):
        self.database = database
        self.logger = logging.getLogger('VotingAPI')

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

    def get_heat_map(self, start_time, end_time):
        """Fetches the data for the generation of the heat map on the client side."""
        return HeatMapPoint.from_tuple_array(self.database.execute(
            """SELECT logical_loc, avg(score) FROM votes
               WHERE logical_loc NOT NULL AND timestamp BETWEEN ? AND ?
               GROUP BY logical_loc""", (start_time, end_time)))

    def get_campus_average(self, start_time, end_time):
        """Returns the average happiness value registered on campus between the `start_time` and the `end_time`."""
        return self.database.execute("SELECT avg(score) FROM votes WHERE timestamp BETWEEN ? AND ?",
                                     (start_time, end_time))[0][0]

    def get_building_average(self, building_label, start_time, end_time):
        """
        Returns the average happiness value registered inside `building_label` between the `start_time` and the
        `end_time`.
        """
        return self.database.execute("SELECT avg(score) FROM votes WHERE timestamp BETWEEN ? AND ? AND logical_loc = ?",
                                     (start_time, end_time, building_label))[0][0]

    def get_happiness_level(self, uid):
        """ Returns the most recent happiness level registered for `uid`. """

        votes = self.database.execute("SELECT score FROM votes WHERE uid = ? ORDER BY timestamp DESC LIMIT 1", (uid,))
        return votes[0][0] if len(votes) != 0 else None
