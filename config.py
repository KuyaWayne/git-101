import os

BIND_IP = '127.0.0.1'
BIND_PORT = 5000

try:
    DEBUG = os.environ['DEBUG']
    if str.upper(DEBUG) == 'TRUE':
        DEBUG = True
    else:
        DEBUG = False
except Exception:
    DEBUG = False

AXA_API = os.environ['AXA_API']
AXA_KEY = os.environ.get('AXA_KEY', '')
