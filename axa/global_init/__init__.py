from flask_cors import CORS
from .flask_app import create_flask_app
from .model import GenericModel

from axa.plugin import AxaApi

app = create_flask_app()
axaapi = AxaApi(app)

CORS(app, resources=r'/api/*')
