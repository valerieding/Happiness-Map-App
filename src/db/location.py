class Location:

    def __init__(self, latitude, longitude, logical_location=None, address=None):
        self.latitude = latitude
        self.longitude = longitude
        self.logical_location = logical_location
        self.address = address

    @staticmethod
    def from_request(request):
        return Location(request.get('latitude'), request.get('longitude'), request.get('logical_location', None),
                        request.get('address', None))
