import logging
import time

from random import randint
from sqlite3 import IntegrityError


class VotingAPI:
    """Handles database requests relating to happiness votes. """

    """Time limit in seconds between two votes by the same person."""
    VOTE_TIMEOUT = 600  # Ten minutes
    VOTE_ID_MAX = 2 ** 32  # TODO: maybe have the database issue serial IDs

    # TODO: figure out how to filter out racing votes from the same user.

    def __init__(self, database):
        self.database = database
        self.logger = logging.getLogger('VotingAPI')

    def issue_user_id(self):
        """Issues a new user ID. """
        return randint(0, 2 ** 32)

    def add_vote(self, uid, location, happiness_level):
        """
        Adds a happiness vote of `happiness_level` at `location` from `uid` to the database. If `uid` has already voted
        in the last `VOTE_TIMEOUT` seconds, that vote is then changed to have this happiness level.
        """
        vote_id = randint(0, VotingAPI.VOTE_ID_MAX)
        while len(self.database.execute("SELECT id FROM votes WHERE id = ? LIMIT 1", (vote_id,))) != 0:
            vote_id = randint(0, VotingAPI.VOTE_ID_MAX)
        try:
            self.database.execute("""INSERT INTO votes values  (?, ?, ?, ?, ?, ?, ?, ?)""",
                                  (vote_id, uid, time.time(), happiness_level, location.latitude,
                                   location.longitude, location.logical_location, location.address))
            self.database.commit()
            return True
        except IntegrityError as e:
            self.logger.exception(e)
            return False

    def get_heat_map(self):
        """Fetches the data for the generation of the heat map on the client side."""
        # TODO: figure out return type
        pass

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
