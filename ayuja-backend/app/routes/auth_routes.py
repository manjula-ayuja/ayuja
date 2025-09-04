from flask import Blueprint, request, jsonify
from app.auth.auth_services import *
from flask_jwt_extended import jwt_required, get_jwt_identity


auth_blueprint = Blueprint("auth", __name__)

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

