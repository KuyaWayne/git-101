from flask import request
from flask_restful import Resource, reqparse

from .model import Register


class RegisterHandler(Resource):
    def __init__(self):
        self.__reqparse = reqparse.RequestParser()
        if request.method in ('POST'):
            self.__reqparse.add_argument('Name', type=str)
            self.__reqparse.add_argument('Email', type=str)
            self.__reqparse.add_argument('Mobile', type=str)
            self.__reqparse.add_argument('PositionApplied', type=str)
            self.__reqparse.add_argument('Source', type=str)
        self.__args = self.__reqparse.parse_args()

    def post(self):
        this_object = Register(self.__args)
        retval = this_object.save()

        return retval
