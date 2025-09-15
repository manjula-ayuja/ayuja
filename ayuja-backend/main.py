






import os
import traceback
from dotenv import load_dotenv

# Flask imports
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager

# FastAPI imports
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.wsgi import WSGIMiddleware

# Scheduler & Firebase
from apscheduler.schedulers.background import BackgroundScheduler
import firebase_admin
from firebase_admin import credentials, messaging
from datetime import datetime

# Your existing Flask blueprints
from app.routes.auth_routes import auth_blueprint
from app.routes.booking_routes import booking_blueprint
from app.routes import emergency_routes_fastapi, complaints_routes_fastapi, booking_routes_fastapi
from app.models.db_utils import *
load_dotenv()

# ----------------- Flask App -----------------
flask_app = Flask(__name__)

# CORS
CORS(
    flask_app,
    resources={r"/*": {"origins": ["http://localhost:3000"]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# JWT Config
flask_app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "supersecret")
flask_app.config["JWT_TOKEN_LOCATION"] = ["headers"]
flask_app.config["JWT_HEADER_NAME"] = "Authorization"
flask_app.config["JWT_HEADER_TYPE"] = "Bearer"
jwt = JWTManager(flask_app)

# Register Flask blueprints
flask_app.register_blueprint(auth_blueprint, url_prefix="/auth")
flask_app.register_blueprint(booking_blueprint, url_prefix="/booking")

# ---------------- Firebase Admin Setup ----------------


device_tokens = []  # In-memory storage, use DB in production

# Register token endpoint
@flask_app.route("/register-token", methods=["POST"])
def register_token():
    data = request.json
    token = data.get("token")
    user_email = data.get("email")  # pass user's email or user_id from frontend

    if not token or not user_email:
        return jsonify({"error": "Token and email required"}), 400

    user = User.objects(email=user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    if "fcm_tokens" not in user or not user.fcm_tokens:
        user.fcm_tokens = []

    if token not in user.fcm_tokens:
        user.fcm_tokens.append(token)
        user.save()

    return jsonify({"message": "Token registered", "tokens": user.fcm_tokens})

def send_notification(title, body):
    users = User.objects(fcm_tokens__exists=True, fcm_tokens__ne=[])
    tokens = []
    for u in users:
        tokens.extend(u.fcm_tokens)

    if not tokens:
        print("No tokens to send notification")
        return

    message = messaging.MulticastMessage(
        notification=messaging.Notification(title=title, body=body),
        tokens=tokens
    )
    response = messaging.send_multicast(message)
    print(f"[{datetime.now()}] Sent {response.success_count} notifications, {response.failure_count} failures")







# Scheduler – automatic notifications 3 times a day
scheduler = BackgroundScheduler()
scheduler.add_job(lambda: send_notification("Appointment Reminder", "You have an appointment today!"), 'cron', hour=14, minute=16)
scheduler.add_job(lambda: send_notification("Service Reminder", "Don't forget to use your service today!"), 'cron', hour=14, minute=14)
scheduler.add_job(lambda: send_notification("Final Reminder", "This is your last reminder for today!"), 'cron', hour=14, minute=15)
scheduler.start()

# Flask error handler
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

# Mount Flask under FastAPI
fastapi_app.mount("/api/flask", WSGIMiddleware(flask_app))

# Include FastAPI routers
fastapi_app.include_router(emergency_routes_fastapi.router, prefix="/api/emergency")
fastapi_app.include_router(complaints_routes_fastapi.router, prefix="/api/complaint")
fastapi_app.include_router(booking_routes_fastapi.router, prefix="/api/booking")

# FastAPI global error handler
@fastapi_app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    traceback.print_exc()
    return JSONResponse(status_code=500, content={"error": str(exc)})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(fastapi_app, host="0.0.0.0", port=5001)
















# import os
# import traceback
# from dotenv import load_dotenv

# # Flask imports
# from flask import Flask, jsonify
# from flask_cors import CORS
# from flask_jwt_extended import JWTManager

# # FastAPI imports
# from fastapi import FastAPI, Request
# from fastapi.responses import JSONResponse
# from fastapi.middleware.cors import CORSMiddleware
# from starlette.middleware.wsgi import WSGIMiddleware


# from app.routes.auth_routes import auth_blueprint
# from app.routes.booking_routes import booking_blueprint
# from app.routes import emergency_routes_fastapi
# from app.routes import complaints_routes_fastapi
# from app.routes import booking_routes_fastapi

# load_dotenv()

# flask_app = Flask(__name__)

# # Flask CORS
# CORS(
#     flask_app,
#     resources={r"/*": {"origins": ["http://localhost:3000"]}},
#     supports_credentials=True,
#     allow_headers=["Content-Type", "Authorization"],
#     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
# )

# # JWT setup
# flask_app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY", "supersecret")
# flask_app.config["JWT_TOKEN_LOCATION"] = ["headers"]
# flask_app.config["JWT_HEADER_NAME"] = "Authorization"
# flask_app.config["JWT_HEADER_TYPE"] = "Bearer"
# jwt = JWTManager(flask_app)

# # Register Flask blueprints
# flask_app.register_blueprint(auth_blueprint, url_prefix="/auth")
# flask_app.register_blueprint(booking_blueprint, url_prefix="/booking")

# # Flask global error handler
# @flask_app.errorhandler(Exception)
# def handle_flask_exception(e):
#     traceback.print_exc()
#     return jsonify({"error": str(e)}), 500


# # ----------------- FastAPI App -----------------
# fastapi_app = FastAPI(title="Hybrid API")

# # FastAPI CORS
# fastapi_app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ----------------- Mount Flask at /api/flask -----------------
# fastapi_app.mount("/api/flask", WSGIMiddleware(flask_app))


# fastapi_app.include_router(emergency_routes_fastapi.router, prefix="/api/emergency")
# fastapi_app.include_router(complaints_routes_fastapi.router, prefix="/api/complaint")
# fastapi_app.include_router(booking_routes_fastapi.router, prefix="/api/booking")


# # FastAPI global error handler
# @fastapi_app.exception_handler(Exception)
# async def global_exception_handler(request: Request, exc: Exception):
#     traceback.print_exc()
#     return JSONResponse(
#         status_code=500,
#         content={"error": str(exc)},
#     )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(fastapi_app, host="0.0.0.0", port=5001)
