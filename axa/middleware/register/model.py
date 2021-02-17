from axa.global_init import GenericModel, axaapi


class Register(GenericModel):
    def __init__(self, args):
        self.__resource = 'register'
        self.__args = args
        self.__api = axaapi
        super().__init__(self.__resource, self.__api, self.__args)
