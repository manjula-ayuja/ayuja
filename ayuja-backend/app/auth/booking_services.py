
from app.models.db_utils import *
import os,json
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename
from app.services.email_sender import *

import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(BASE_DIR, "services", "email_templates.json")) as f:
    EMAIL_TEMPLATES = json.load(f)

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
            status="new" 
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
            status="new"
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

def booking_to_dict(booking):
    return {
        "booking_id": booking.booking_id,
        "guest_name": booking.guest_name,
        "guest_email": booking.guest_email,
        "guest_phone": booking.guest_phone,
        "service_type": booking.service_type,
        "gender": booking.gender,
        "date": booking.date.isoformat() if booking.date else None,
        "age": booking.age,
        "status": booking.status,
        "staff_id": booking.staff_id,
        "notes": booking.notes,
        "invoice_url": booking.invoice_url,
        "created_at": booking.created_at.isoformat() if booking.created_at else None,
        "payment": {
            "amount": booking.payment.amount if booking.payment else None,
            "status": booking.payment.status if booking.payment else None
        } if hasattr(booking, "payment") else None
    }
def update_booking_logic(booking_id, body):
    action = body.get("action")  
    new_status = body.get("status")
    new_date = body.get("date")
    notes = body.get("notes")

    booking = Booking.objects.get(booking_id=booking_id)
    template_key = "status_update"

    if action == "reschedule":
        if new_date:
            booking.date = datetime.fromisoformat(new_date)
        booking.status, template_key = "rescheduled", "rescheduled"

    elif action == "cancel":
        if booking.status == "cancelled":
            raise ValueError("Booking already cancelled")
        booking.status, template_key = "cancelled", "cancelled"

    elif action == "status":
        allowed = {"new", "assigned", "in-progress", "completed", "cancelled", "rescheduled"}
        if not new_status or new_status not in allowed:
            raise ValueError(f"Invalid status. Allowed: {sorted(allowed)}")
        booking.status, template_key = new_status, "status_update"

    else:
        raise ValueError("Invalid action")

    if notes:
        booking.notes = notes

    booking.save()

    # ---------------- EMAIL ----------------
    recipients = []
    if getattr(booking, "resident", None) and getattr(booking.resident, "email", None):
        recipients.append(booking.resident.email)
    if not recipients and booking.guest_email:
        recipients.append(booking.guest_email)

    if recipients:
        tmpl = EMAIL_TEMPLATES[template_key]
        subject = tmpl["subject"].format(
            service_type=booking.service_type,
            status=booking.status.capitalize(),
            booking_id=booking.booking_id,
        )
        body_html = tmpl["body"].format(
            service_type=booking.service_type,
            date=booking.date.strftime("%Y-%m-%d %H:%M") if booking.date else "N/A",
            status=booking.status.capitalize(),
            booking_id=booking.booking_id,
            notes=booking.notes or "N/A",
        )
        try:
            send_email(recipients, subject, body_html)
        except Exception as e:
            logger.error(f"Failed to send email: {e}")

    return {
        "message": "Booking updated successfully",
        "booking": booking_to_dict(booking),
    }
