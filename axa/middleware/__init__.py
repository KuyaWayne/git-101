from flask_restful import Api

from .register import RegisterHandler
from .upload import UploadHandler
from .schedule import ScheduleHandler


class MiddleWare(object):
    def __init__(self, app):
        self.__api = Api(app)

        self.__api.add_resource(RegisterHandler, '/api/register')
        self.__api.add_resource(UploadHandler, '/api/upload')
        self.__api.add_resource(ScheduleHandler, '/api/schedule')
