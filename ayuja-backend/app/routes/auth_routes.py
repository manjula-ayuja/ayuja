from flask import Blueprint, request, jsonify
from app.auth.auth_services import *
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.db_utils import *
from bson import json_util

auth_blueprint = Blueprint("auth", __name__)


# route to get the complete user data stored in the redis cache
def to_json(doc):
    """Helper to safely convert MongoEngine Document/EmbeddedDocument to dict"""
    return json.loads(json_util.dumps(doc.to_mongo()))

@auth_blueprint.route("/user/<user_id>", methods=["GET"])
def get_user(user_id):
    try:
        redis_key = f"user:{user_id}"
        cached_user = redis_client.get(redis_key)

        if cached_user:
            logger.info("User fetched from Redis: %s", redis_key)
            return jsonify({"success": True, "user": json.loads(cached_user)}), 200

        # Fallback: fetch from MongoDB
        user = User.objects(user_id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Convert user doc to dict
        user_data = to_json(user)

        # Fetch related data
        user_data["bookings"] = [to_json(b) for b in Booking.objects(resident=user)]
        user_data["complaints"] = [to_json(c) for c in Complaint.objects(resident_id=user_id)]
        user_data["emergencies"] = [to_json(e) for e in Emergency.objects(resident_id=user_id)]
        user_data["notifications"] = [to_json(n) for n in Notification.objects(user_id=user_id)]

        # ✅ Cache for 4 hours
        redis_client.set(redis_key, json.dumps(user_data), ex=14400)
        return jsonify({"success": True, "user": user_data}), 200

    except Exception as e:
        logger.error("Error fetching user from Redis: %s", str(e))
        return jsonify({"error": str(e)}), 500



@auth_blueprint.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    result = register_user(data)
    if "error" in result:
        return jsonify(result), 400
    return jsonify(result), 200




# ✅ Login Route
@auth_blueprint.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        print("Login request data:", data)  
        identifier = data.get("identifier")
        password = data.get("password")

        response, status = login_user(identifier, password)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@auth_blueprint.route("/request-reset", methods=["POST"])
def request_reset():
    try:
        data = request.get_json()
        identifier = data.get("identifier") if data else None

        if not identifier:
            return jsonify({"success": False, "message": "Identifier (email or phone) is required"}), 400

        success, message = request_password_reset(identifier)
        status_code = 200 if success else 400
        return jsonify({"success": bool(success), "message": message}), status_code

    except Exception as e:
        logger.exception("Error in /request-reset")
        return jsonify({"success": False, "message": "Internal server error"}), 500

@auth_blueprint.route("/verify-otp", methods=["POST"])
def verify_reset_otp():
    data = request.get_json()
    identifier = data.get("identifier")
    otp = data.get("otp")

    success, message = verify_otp(identifier, otp)
    return jsonify({"success": success, "message": message}), (200 if success else 400)

@auth_blueprint.route("/reset-password", methods=["POST"])
def reset_user_password():
    data = request.get_json()
    identifier = data.get("identifier")
    new_password = data.get("newPassword")

    success, message = reset_password(identifier, new_password)
    return jsonify({"success": success, "message": message}), (200 if success else 400)


@auth_blueprint.route("/get-user-details", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        user = User.objects(user_id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "user": {
                "user_id": str(user.user_id),
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "address": user.address,
                "emergency_contacts": user.emergency_contacts,
                "family_members": user.family_members,
                "documents": user.documents
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@auth_blueprint.route("/update-profile", methods=["PUT"])
@jwt_required()
def update_profile():
    try:
        user_id = get_jwt_identity()
        data = request.json

        user, error = update_user_profile(user_id, data)
        if error:
            return jsonify({"error": error}), 404

        return jsonify({
            "message": "Profile updated successfully",
            "user": {
                "user_id": str(user.user_id),
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "address": user.address,
                "emergency_contacts": user.emergency_contacts,
                "family_members": user.family_members,
                "documents": user.documents
            }
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@auth_blueprint.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():
    try:
        user_id = get_jwt_identity()
        data = request.json
        new_password = data.get("new_password")
        confirm_password = data.get("confirm_password")

        error = change_user_password(user_id, new_password, confirm_password)
        if error:
            return jsonify({"error": error}), 400 if "required" in error or "match" in error else 404

        return jsonify({"message": "Password changed successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_blueprint.route("/logout/<user_id>", methods=["POST"])
def logout(user_id):
    try:
        # Clear cached user data
        redis_key = f"user:{user_id}"
        redis_client.delete(redis_key)

        # If you also store tokens in Redis, delete that too
        token = request.headers.get("Authorization")
        if token:
            token = token.replace("Bearer ", "")
            redis_client.delete(token)

        logger.info("User logged out, Redis cleared: %s", redis_key)
        return jsonify({"success": True, "message": "Logged out successfully"}), 200

    except Exception as e:
        logger.error("Error during logout: %s", str(e))
        return jsonify({"error": str(e)}), 500
