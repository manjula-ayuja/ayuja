

import re
import jwt
import logging
from datetime import datetime, timedelta
from firebase_admin import auth
from app.models.db_utils import User, bcrypt
from mongoengine.errors import NotUniqueError
from flask import current_app
import os
import bcrypt
import random
from app.services.email_sender import *
import string
from flask_jwt_extended import create_access_token

logger = logging.getLogger(__name__)
SECRET_KEY = os.getenv("SECRET_KEY") 

def generate_number():
    """Generate a random 10-digit number."""
    return random.randint(100000000, 9999999999)

def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))

def register_user_via_google(data):
    logger.info("Entered into Google OAuth registration logic")

    try:
        google_id_token = data.get('googleIdToken')
        name = data.get('name')
        email = data.get('email')
        # phone = data.get('contact')
        phone = str(generate_number())

        if not google_id_token or not name or not email:
            logger.info("Missing Google token, name, or email")
            return {"error": "Invalid Google registration data."}

        existing_user = User.objects(email=email).first()
        if existing_user:
            logger.info("Email already in use: %s", email)
            return {"error": "The email address is already in use."}

        try:
            firebase_user = auth.get_user_by_email(email)
            logger.info("User already exists in Firebase with UID: %s", firebase_user.uid)
        except auth.UserNotFoundError:
            firebase_user = auth.create_user(
                email=email,
                display_name=name
            )
            logger.info("User created in Firebase with UID: %s", firebase_user.uid)

        # Ensure phone is not null if it's being saved
        user = User(
            name=name,
            email=email,
            firebaseUid=firebase_user.uid,
            phone=phone
        )
        user.save()
        logger.info("User saved in MongoDB: %s", user.to_mongo())

        retrieved_user = User.objects(email=email).first()
        if retrieved_user:
            user_id = str(retrieved_user._id)
            logger.info("Retrieved user data from MongoDB: %s", retrieved_user.to_mongo())

        token = jwt.encode({
            'user_id': user_id,
            'exp': datetime.utcnow() + timedelta(days=1)
        }, SECRET_KEY, algorithm='HS256')

        user_details = {
            "userId": user_id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "token": token,
            "status": "User Registered via Google"
        }
        logger.info("Google registration successful: %s", user_details)

        return {"user": user_details, "status": "User Registered via Google", "token": token},200

    except Exception as e:
        logger.critical("Google registration failed: %s", str(e))
        return {"error": f"Google registration failed: {str(e)}"}
def register_user(data):
    logger.info("Entered into registration logic")

    try:
        # ✅ Extract inputs
        name = data.get("name")
        role = data.get("role")
        email = data.get("email")
        phone = data.get("phone")
        password = data.get("password")

        if not all([name, role, email, phone, password]):
            return {"error": "All fields are required"}
        
        # ✅ Normalize phone (always +91 prefix if missing)
        if not phone.startswith("+91"):
            phone = f"+91{phone}"

        # ✅ Validate password
        if not re.match(r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', password):
            logger.warning("Password validation failed for: %s", password)
            return {
                "error": "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long."
            }

        # ✅ Check if user exists in MongoDB (by phone/email)
        existing_user = User.objects(__raw__={'$or': [{'phone': phone}, {'email': email}] }).first()
        if existing_user:
            if existing_user.phone == phone:
                return {"error": "The phone number is already in use."}
            elif existing_user.email == email:
                return {"error": "The email address is already in use."}

        # ✅ Check if user exists in Firebase
        try:
            firebase_user = auth.get_user_by_phone_number(phone)
            logger.info("Found existing Firebase user with UID: %s", firebase_user.uid)
        except auth.UserNotFoundError:
            # Create new Firebase user
            firebase_user = auth.create_user(
                phone_number=phone,
                email=email,
                display_name=name,
                password=password
            )
            logger.info("New Firebase user created with UID: %s", firebase_user.uid)

        # ✅ Hash password for MongoDB (keep for app-side auth)
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # ✅ Save user in MongoDB
        user = User(
            name=name,
            role=role,
            email=email,
            phone=phone,
            firebaseUid=firebase_user.uid,
            password_hash=hashed_password,
            emergency_contacts=data.get("emergency_contacts", []),
            family_members=data.get("family_members", []),
            documents=data.get("documents", [])
        )
        user.save()
        logger.info("User saved in MongoDB: %s", user.to_mongo())

        # ✅ JWT Token (for your backend, not Firebase)
        token = create_access_token(
            identity=str(user.user_id),
            additional_claims={
                "email": user.email,
                "role": user.role
            }
        )

        # ✅ Prepare response
        user_details = {
            "userId": str(user.user_id),
            "firebaseUid": user.firebaseUid,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "token": token,
            "status": "User Registered"
        }

        return {"success": True, "user": user_details, "token": token}

    except NotUniqueError:
        return {"error": "User already exists in MongoDB"}
    except Exception as e:
        logger.critical("Registration failed: %s", str(e))
        return {"error": str(e)}


def login_user(identifier, password):
    if not identifier or not password:
        return {"message": "Identifier and password are required"}, 400

    # If identifier looks like phone number
    if identifier.isdigit() or identifier.startswith("+91"):
        # Ensure phone has +91
        phone = identifier if identifier.startswith("+91") else f"+91{identifier}"
        user = User.objects(phone=phone).first()
    else:
        # Treat as email
        user = User.objects(email=identifier).first()

    if not user:
        return {"message": "User not found"}, 404
    
    # ✅ Correct for flask-bcrypt
    if not bcrypt.check_password_hash(user.password_hash, password):
        return {"message": "Invalid credentials"}, 401

    # Generate JWT
    token = create_access_token(
        identity=str(user.user_id),
        additional_claims={
            "email": user.email,
            "role": user.role
        }
    )

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "user_id": str(user.user_id),
            "email": user.email,
            "phone": user.phone,
            "name": user.name,
            "role": user.role
        }
    }, 200


def request_password_reset(identifier):
    """
    identifier = email OR phone
    """
    user = User.objects.filter(
        __raw__={"$or": [{"email": identifier}, {"phone": identifier}]}
    ).first()
    if not user:
        return False, "User not found"

    otp = generate_otp()
    user.otp = otp
    user.save()

    # Email / SMS handling
    if "@" in identifier:  # Email flow
        subject = "Ayuja Password Reset OTP"
        body = f"""
        <html>
            <body>
                <p>Hello {user.name},</p>
                <p>We received a request to reset your password. Please use the following OTP:</p>
                <h2 style="color:#1976d2;">{otp}</h2>
                <p>This OTP will expire in 10 minutes. If you did not request this, please ignore this email.</p>
                <br>
                <p>Best Regards,<br>Ayuja Support Team</p>
            </body>
        </html>
        """
        if send_email([user.email], subject, body):
            print("entered to send email")
            return jsonify({"success": True, "message": "OTP sent to your email"}), 200
        else:
            return jsonify({"success": False, "message": "Failed to send OTP"}), 500

    else:  # Phone flow (simulated)
        print(f"OTP for {user.phone}: {otp}")
        return jsonify({"success": True, "message": "OTP sent to your mobile"}), 200


def verify_otp(identifier, otp):
    user = User.objects.filter(
        __raw__={"$or": [{"email": identifier}, {"phone": identifier}], "otp": otp}
    ).first()

    if not user:
        return False, "Invalid OTP"
    return True, "OTP verified"

def reset_password(identifier, new_password):
    user = User.objects.filter(
        __raw__={"$or": [{"email": identifier}, {"phone": identifier}]}
    ).first()

    if not user:
        return False, "User not found"

    user.password_hash = bcrypt.generate_password_hash(new_password).decode("utf-8")
    user.otp = None  # clear OTP
    user.save()
    return True, "Password updated successfully"


def update_user_profile(user_id, data):
    """
    Update user profile fields.
    Returns updated user object.
    """
    user = User.objects(user_id=user_id).first()
    if not user:
        return None, "User not found"

    # Update simple fields
    if "name" in data:
        user.name = data["name"]
    if "email" in data:
        user.email = data["email"]
    if "phone" in data:
        user.phone = data["phone"]
    if "address" in data:
        user.address = data["address"]      

    # Emergency contacts as ["Name:Phone"]
    if "emergency_contacts" in data:
        updated_contacts = []
        for ec in data["emergency_contacts"]:
            if isinstance(ec, dict):
                updated_contacts.append(f"{ec.get('name')}:{ec.get('phone')}")
            elif isinstance(ec, str):
                updated_contacts.append(ec)
        user.emergency_contacts = updated_contacts

    # Family members as ["Name:Relation"]
    if "family_members" in data:
        updated_members = []
        for fm in data["family_members"]:
            if isinstance(fm, dict):
                updated_members.append(f"{fm.get('name')}:{fm.get('relation')}")
            elif isinstance(fm, str):
                updated_members.append(fm)
        user.family_members = updated_members

    # Documents as list of dicts
    if "documents" in data:
        user.documents = [
            {"type": doc.get("type"), "number": doc.get("number")}
            for doc in data["documents"]
        ]

    user.save()
    return user, None


def change_user_password(user_id, new_password, confirm_password):
    """
    Change user password after validation.
    Returns error message if any, else None.
    """
    user = User.objects(user_id=user_id).first()
    if not user:
        return "User not found"

    if not new_password or not confirm_password:
        return "Both new_password and confirm_password are required"

    if new_password != confirm_password:
        return "Passwords do not match"

    user.set_password(new_password)
    user.save()
    return None
