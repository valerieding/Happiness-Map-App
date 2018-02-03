class MessageAPI:
    """Handles database requests relating to message posts. """


    def __init__(self, database):
        pass


    def get_recent_posts(self, location, start_time, end_time):
        """Retrieves the messages posted between `start_time` and `end_time` around `location`. """
        # TODO: define what "around" means
        pass


    def get_trending_posts(self, location):
        """Retrieves the trending messages posted around `location`. """
        pass


    def get_posts(self, filter):
        # TODO: figure out what this should do. Is filter a generic predicate on Posts?
        pass


    def add_post(self, uid, location, message):
        """Adds a `message` by `uid` posted at `location`. """
        pass


    def upvote(self, uid, post_id):
        """Adds an upvote to `post_id` by `uid`. """
        pass


    def downvote(self, uid, post_id):
        """Adds a downvote to `post_id` by `uid`. """
        pass


    def remove_post(self, post_id):
        """Removes the post with `post_id`. Should only be accessible to admins. """
        pass
