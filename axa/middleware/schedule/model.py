from axa.global_init import GenericModel, axaapi


class Schedule(GenericModel):
    def __init__(self, args):
        self.__resource = 'schedule'
        self.__args = args
        self.__api = axaapi
        super().__init__(self.__resource, self.__api, self.__args)
