from flask import render_template

from .global_init import app
from .middleware import MiddleWare


@app.route('/', endpoint='index')
def index():
    return render_template('app.html')


api = MiddleWare(app)
application = app
