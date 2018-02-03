class VotingAPI:
    """Handles database requests relating to happiness votes. """

    """Time limit in seconds between two votes by the same person."""
    VOTE_TIMEOUT = 600  # Ten minutes

    # TODO: figure out how to filter out racing votes from the same user.

    def __init__(self, database):
        pass


    def add_vote(self, uid, location, happiness_level):
        """
        Adds a happiness vote of `happiness_level` at `location` from `uid` to the database. If `uid` has already voted in
        the last `VOTE_TIMEOUT` seconds, that vote is then changed to have this happiness level.
        """
        pass


    def get_heat_map(self):
        """Fetches the data for the generation of the heat map on the client side."""
        # TODO: figure out return type
        pass


    def get_campus_average(self, start_time, end_time):
        """Returns the average happiness value registered on campus between the `start_time` and the `end_time`."""
        pass


    def get_building_average(self, building_label, start_time, end_time):
        """
        Returns the average happiness value registered inside `building_label` between the `start_time` and the`end_time`.
        """
        pass
