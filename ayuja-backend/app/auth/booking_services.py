
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





def book_appointment(name, email, phone, gender, service_type, date, age, notes=None, payment_data=None):
    """
    Create a booking with optional embedded payment.
    Booking is only stored if payment is successful.
    """
    # Ensure payment is provided and successful
    if not payment_data or payment_data.get("status") != "success":
        raise ValueError("Payment not successful. Booking not created.")

    user = User.objects(email=email).first() or User.objects(phone=phone).first()

    
        # ✅ FIX: Always set a unique payment_id
    payment = Payment(
        payment_id=payment_data.get("payment_id") or str(uuid.uuid4()),  
        amount=payment_data["amount"],
        method=payment_data["method"],
        status=payment_data["status"],
        discount_code=payment_data.get("discount_code"),
        transaction_history=payment_data.get("transaction_history", [])
    )


    if user:
        # Registered user booking
        booking = Booking(
            resident=user,
            service_type=service_type,
            gender=gender,
            date=date,
            age=age,
            notes=notes,
            payment=payment,
            status="completed"  # mark as completed since payment success
        )
    else:
        # Guest booking
        booking = Booking(
            guest_name=name,
            guest_email=email,
            guest_phone=phone,
            guest_gender=gender,
            service_type=service_type,
            gender=gender,
            date=date,
            age=age,
            notes=notes,
            payment=payment,
            status="completed"
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


def get_bookings_by_user(email=None, phone=None):
    """
    Fetch bookings only for registered users via User->Booking relationship.
    Guest bookings are ignored.
    """
    if not email and not phone:
        raise ValueError("Email or phone required")

    # 🔹 Find registered user by email/phone
    user = None
    if email:
        user = User.objects(email=email).first()
    if not user and phone:
        user = User.objects(phone=phone).first()

    if not user:
        # If no registered user found → return empty
        return []

    # 🔹 Fetch bookings linked to this registered user
    bookings = Booking.objects(resident=user)

    # 🔹 Format response
    booking_list = []
    for b in bookings:
        booking_list.append({
            "booking_id": str(b.booking_id),
            "service_type": b.service_type,
            "gender": b.gender,
            "date": b.date.isoformat() if b.date else None,
            "age": b.age,
            "status": b.status,
            "notes": b.notes,
            "staff_id": b.staff_id,
            "invoice_url": b.invoice_url,
            "resident": {
                "name": b.resident.name if b.resident else None,
                "email": b.resident.email if b.resident else None,
                "phone": b.resident.phone if b.resident else None,
            },
            "payment": {
                "payment_id": str(b.payment.payment_id) if b.payment else None,
                "amount": b.payment.amount if b.payment else None,
                "method": b.payment.method if b.payment else None,
                "status": b.payment.status if b.payment else None,
            } if b.payment else None,
            "created_at": b.created_at.isoformat() if b.created_at else None
        })

    return booking_list
