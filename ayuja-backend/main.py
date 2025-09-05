

# from flask import Flask, redirect,jsonify,send_file
# from flask_cors import CORS
# from mongoengine import connect
# from app.routes.auth_routes import auth_blueprint
# from app.routes.booking_routes import *
# from app.routes.complaints_routes import *
# from app.routes.emergency_routes import *
# from app.routes import emergency_routes_fastapi
# import os
# import requests
# from dotenv import load_dotenv
# from flask import send_from_directory
# from flask_jwt_extended import JWTManager 

# load_dotenv()



# # Create Flask app
# app = Flask(__name__)
# CORS(app, methods=['GET', 'POST', 'PUT', 'DELETE'])


# # Load allowed origins from environment variable
# origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
# # CORS(app, resources={r"/*": {"origins": origins}})
# CORS(app, resources={r"/*": {"origins": origins}}, supports_credentials=True, 
#      allow_headers=["Content-Type", "Authorization"])


# # ✅ JWT Config
# app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
# app.config["JWT_TOKEN_LOCATION"] = ["headers"]    
# app.config["JWT_HEADER_NAME"] = "Authorization" 
# app.config["JWT_HEADER_TYPE"] = "Bearer"          

# jwt = JWTManager(app)  # ✅ Initialize JWT with the app


# # Register your blueprint
# app.register_blueprint(auth_blueprint, url_prefix="/api/auth")
# app.register_blueprint(booking_blueprint, url_prefix="/api/booking")
# app.register_blueprint(complaint_blueprint, url_prefix="/api/complaint")
# app.register_blueprint(emergency_blueprint, url_prefix="/api/emergency")



# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001)










import os
import traceback
from dotenv import load_dotenv

# Flask imports
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# FastAPI imports
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.wsgi import WSGIMiddleware


from app.routes.auth_routes import auth_blueprint
from app.routes.booking_routes import booking_blueprint
from app.routes.complaints_routes import complaint_blueprint
from app.routes import emergency_routes_fastapi

load_dotenv()

flask_app = Flask(__name__)

# Flask CORS
CORS(
    flask_app,
    resources={r"/*": {"origins": ["http://localhost:3000"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# JWT setup
flask_app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "supersecret")
flask_app.config["JWT_TOKEN_LOCATION"] = ["headers"]
flask_app.config["JWT_HEADER_NAME"] = "Authorization"
flask_app.config["JWT_HEADER_TYPE"] = "Bearer"
jwt = JWTManager(flask_app)

# Register Flask blueprints
flask_app.register_blueprint(auth_blueprint, url_prefix="/auth")
flask_app.register_blueprint(booking_blueprint, url_prefix="/booking")
flask_app.register_blueprint(complaint_blueprint, url_prefix="/complaint")

# Flask global error handler
@flask_app.errorhandler(Exception)
def handle_flask_exception(e):
    traceback.print_exc()
    return jsonify({"error": str(e)}), 500


# ----------------- FastAPI App -----------------
fastapi_app = FastAPI(title="Hybrid API")

# FastAPI CORS
fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Mount Flask at /api/flask -----------------
fastapi_app.mount("/api/flask", WSGIMiddleware(flask_app))


fastapi_app.include_router(emergency_routes_fastapi.router, prefix="/api/emergency")

# FastAPI global error handler
@fastapi_app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"error": str(exc)},
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(fastapi_app, host="0.0.0.0", port=5001)
