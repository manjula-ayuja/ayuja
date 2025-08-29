

from flask import Blueprint, request, jsonify
from datetime import datetime
from app.auth.booking_services import *

booking_blueprint = Blueprint("booking", __name__)

@booking_blueprint.route("/book-appointment", methods=["POST"])
def create_booking():
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        role = data.get("role", "resident")  # default role
        service_type = data.get("service_type")
        date_str = data.get("date")
        notes = data.get("notes")

        if not all([name, email, phone, service_type, date_str]):
            return jsonify({"error": "Missing required fields"}), 400

        date = datetime.fromisoformat(date_str)

        booking = book_appointment(
            name=name,
            email=email,
            phone=phone,
            role=role,
            service_type=service_type,
            date=date,
            notes=notes,
        )

        return jsonify({
            "message": "Booking created successfully",
            "booking_id": str(booking.booking_id),
            "user_id": str(booking.resident.user_id)
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@booking_blueprint.route("/upload-prescription/<booking_id>", methods=["POST"])
def upload_prescription_route(booking_id):
    print("booking_id:::",booking_id)
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files["file"]
        print("files in the booking storeage:",file)
        result = upload_prescription(booking_id, file)
        print("resuli in the line 102 :::",result)

        return jsonify(result), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
