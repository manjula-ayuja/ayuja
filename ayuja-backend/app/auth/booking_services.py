
from app.models.db_utils import *
import os
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename


# Folder to store prescriptions
UPLOAD_FOLDER = os.path.join(os.getcwd(), "Prescriptions")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf"}


def allowed_file(filename):
    """Check if file extension is allowed"""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def book_appointment(name, email, phone, role, service_type, date, notes=None):
    user = User.objects(email=email).first() or User.objects(phone=phone).first()

    # If user not found, create one in MongoDB and Firebase
    if not user:
        user = User(
            name=name,
            email=email,
            phone=phone,
            role=role
        )
        user.set_password(email)  
        user.save()

        # 🔥 Create user in Firebase Authentication
        try:
            firebase_user = auth.create_user(
                email=email,
                email_verified=False,
                password=email,  # same as Mongo default
                display_name=name,
                phone_number=f"+91{phone}" if not phone.startswith("+") else phone,  # optional
                disabled=False,
            )
            print(f"✅ Firebase user created: {firebase_user.uid}")
        except Exception as e:
            print(f"⚠️ Firebase user creation failed: {e}")

    # Create the booking
    booking = Booking(
        resident=user,
        service_type=service_type,
        date=date,
        notes=notes
    )
    booking.save()
    return booking

def upload_prescription(booking_id, file):
    """Upload prescription for a booking"""
    if not file or file.filename == "":
        raise ValueError("No file provided")

    if not allowed_file(file.filename):
        raise ValueError("Invalid file type")

    booking = Booking.objects(booking_id=booking_id).first()
    if not booking:
        raise ValueError("Booking not found")

    # Create folder for this booking
    booking_folder = os.path.join(UPLOAD_FOLDER, booking_id)
    os.makedirs(booking_folder, exist_ok=True)

    # Save file
    filename = secure_filename(file.filename)
    file_path = os.path.join(booking_folder, filename)
    file.save(file_path)

    # Update booking prescriptions
    booking.prescriptions.append({
        "filename": filename,
        "path": file_path,
        "uploaded_at": datetime.utcnow().isoformat()
    })
    booking.save()

    return {
        "message": "Prescription uploaded successfully",
        "file_path": file_path
    }
