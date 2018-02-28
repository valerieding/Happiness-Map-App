from server.util.cookie_manager import CookieManager


class UserManager:
    """ Manages regular user IDs stored in (signed) cookies. """

    def __init__(self, key, db):
        self.cookie_manager = CookieManager(key, 'user_id', {'user_id'})
        self.db = db

    def new_user(self):
        """Returns a fresh user_id. """
        user_id = self.db.issue_user_id()
        return user_id, self.cookie_manager.encode(user_id=user_id)

    def get_user(self, cookies):
        response = self.cookie_manager.decode(cookies)
        return response.get('user_id') if response is not None and type(response) == dict else None
