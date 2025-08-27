

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

logger = logging.getLogger(__name__)
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey") 

def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))

def register_user(data):
    logger.info("Entered into registration logic")

    try:
        # Extract inputs
        name = data.get("name")
        role = data.get("role")
        email = data.get("email")
        phone = data.get("phone")
        password = data.get("password")

        if not all([name, role, email, phone, password]):
            return {"error": "All fields are required"}
        
        # ✅ Always add +91 if not already present
        if not phone.startswith("+91"):
            phone = f"+91{phone}"

        # ✅ Validate password
        if not re.match(r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', password):
            logger.warning("Password validation failed for: %s", password)
            return {"error": "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long."}

        # ✅ Check if user exists in MongoDB
        existing_user = User.objects(__raw__={'$or': [{'phone': phone}, {'email': email}] }).first()
        if existing_user:
            if existing_user.phone == phone:
                return {"error": "The phone number is already in use."}
            elif existing_user.email == email:
                return {"error": "The email address is already in use."}

        # ✅ Check if user exists in Firebase
        try:
            firebase_user = auth.get_user_by_email(email)
        except auth.UserNotFoundError:
            # Create new Firebase user
            firebase_user = auth.create_user(
                email=email,
                password=password,
                display_name=name,
                phone_number=f"+{phone}" if not phone.startswith("+") else phone
            )
            logger.info("User created in Firebase with UID: %s", firebase_user.uid)

        # ✅ Hash password for MongoDB
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # ✅ Save to MongoDB
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

        # ✅ JWT Token
        token = jwt.encode({
            'user_id': str(user.user_id),
            'exp': datetime.utcnow() + timedelta(days=1)
        }, SECRET_KEY, algorithm='HS256')

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
    payload = {
        "user_id": str(user.user_id),
        "email": user.email,
        "role": user.role,
        "exp": datetime.utcnow() + timedelta(days=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

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