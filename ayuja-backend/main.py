

from flask import Flask, redirect,jsonify,send_file
from flask_cors import CORS
from mongoengine import connect
from app.routes.auth_routes import auth_blueprint
from app.routes.booking_routes import *
from app.routes.complaints_routes import *
import os
import requests
from dotenv import load_dotenv
from flask import send_from_directory
from flask_jwt_extended import JWTManager 

load_dotenv()



# Create Flask app
app = Flask(__name__)
CORS(app, methods=['GET', 'POST', 'PUT', 'DELETE'])


# Load allowed origins from environment variable
origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
# CORS(app, resources={r"/*": {"origins": origins}})
CORS(app, resources={r"/*": {"origins": origins}}, supports_credentials=True, 
     allow_headers=["Content-Type", "Authorization"])


# ✅ JWT Config
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["JWT_TOKEN_LOCATION"] = ["headers"]    
app.config["JWT_HEADER_NAME"] = "Authorization" 
app.config["JWT_HEADER_TYPE"] = "Bearer"          

jwt = JWTManager(app)  # ✅ Initialize JWT with the app


# Register your blueprint
app.register_blueprint(auth_blueprint, url_prefix="/api/auth")
app.register_blueprint(booking_blueprint, url_prefix="/api/booking")
app.register_blueprint(complaint_blueprint, url_prefix="/api/complaint")





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
   