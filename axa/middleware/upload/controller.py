from flask import request
from flask_restful import Resource, reqparse

from axa.global_init import app
from .model import Upload


class UploadHandler(Resource):
    def __init__(self):
        self.__reqparse = reqparse.RequestParser()
        if request.method in ('POST'):
            self.__reqparse.add_argument('file', type=dict, location='json')
        self.__args = self.__reqparse.parse_args()

    def post(self):
        this_object = Upload(self.__args)
        retval = this_object.save()

        return retval
