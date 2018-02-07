class Location:

    def __init__(self, latitude, longitude, logical_location=None, address=None):
        self.latitude = latitude
        self.longitude = longitude
        self.logical_location = logical_location
        self.address = address

    @staticmethod
    def from_request(form):
        return Location(form.latitude.data, form.longitude.data, form.logical_location.data, form.address.data)
