

from flask import Flask, redirect,jsonify,send_file
from flask_cors import CORS
from mongoengine import connect
from app.routes.auth_routes import auth_blueprint
import os
import requests
from dotenv import load_dotenv
from flask import send_from_directory


load_dotenv()



# Create Flask app
app = Flask(__name__)
CORS(app, methods=['GET', 'POST', 'PUT', 'DELETE'])


# Load allowed origins from environment variable
origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

CORS(app, resources={r"/*": {"origins": origins}})

# Register your blueprint
# app.register_blueprint(auth_blueprint)
app.register_blueprint(auth_blueprint, url_prefix="/api/auth")



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
   