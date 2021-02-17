from axa.global_init import GenericModel, axaapi


class Upload(GenericModel):
    def __init__(self, args):
        self.__resource = 'upload'
        self.__args = args
        self.__api = axaapi
        super().__init__(self.__resource, self.__api, self.__args)
