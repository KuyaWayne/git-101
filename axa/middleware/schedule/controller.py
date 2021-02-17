from flask import request
from flask_restful import Resource, reqparse

from axa.global_init import app
from .model import Schedule


class ScheduleHandler(Resource):
    def __init__(self):
        self.__reqparse = reqparse.RequestParser()
        if request.method in ('POST'):
            self.__reqparse.add_argument('ProposedDate', type=str)
            self.__reqparse.add_argument('ProposedTime', type=str)
            self.__reqparse.add_argument('Online', type=str)
        self.__args = self.__reqparse.parse_args()

    def post(self):
        this_object = Schedule(self.__args)
        retval = this_object.save()

        return retval
