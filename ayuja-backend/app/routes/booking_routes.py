
from flask import Blueprint, request, jsonify
from datetime import datetime
from app.auth.booking_services import *
from mongoengine import DoesNotExist
from app.routes.booking_routes_fastapi import *
import logging
booking_blueprint = Blueprint("booking", __name__)
logger = logging.getLogger(__name__)

@booking_blueprint.route("/book-appointment", methods=["POST"])
def create_booking():
    try:
        data = request.json

        # Extract fields
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        gender = data.get("gender", "male")
        service_type = data.get("service_type")
        date_str = data.get("date")
        age = data.get("age")
        notes = data.get("notes")
        payment_data = data.get("payment")  # embedded payment object

        # Validate required fields
        if not all([name, email, phone, service_type, date_str, age, payment_data]):
            return jsonify({"error": "Missing required fields"}), 400

        date = datetime.fromisoformat(date_str)

        # Create booking with payment
        booking = book_appointment(
            name=name,
            email=email,
            phone=phone,
            gender=gender,
            service_type=service_type,
            date=date,
            age=age,
            notes=notes,
            payment_data=payment_data,
        )

        response = {
            "message": "Booking created successfully",
            "booking_id": str(booking.booking_id),
            "payment_status": booking.payment.status,
            "payment_method": booking.payment.method,
        }

        if booking.resident:
            response["user_id"] = str(booking.resident.user_id)
            response["user_type"] = "registered"
        else:
            response["user_type"] = "guest"
        # 🔑 Broadcast updated booking list to all WebSocket clients
        try:
            bookings = Booking.objects()
            bookings_list = [serialize_booking(b) for b in bookings]
            import asyncio
            asyncio.run(booking_ws_manager.broadcast(bookings_list))
        except Exception as ws_err:
            print(f"WebSocket broadcast failed: {ws_err}")
        return jsonify(response), 201

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@booking_blueprint.route("/upload-prescription/<booking_id>", methods=["POST"])
def upload_prescription_route(booking_id):
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files["file"]
        result = upload_prescription(booking_id, file)

        return jsonify(result), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@booking_blueprint.route("/process-payment", methods=["POST"])
def process_payment():
    data = request.get_json()
    
    # Mock payment processing
    method = data.get("method")
    details = data.get("details", {})
    
    # Simulate success
    payment_status = "success"
    transaction_id = str(uuid.uuid4())

    return jsonify({
        "status": payment_status,
        "method": method,
        "details": details,
        "transaction_id": transaction_id,
        "timestamp": datetime.now().isoformat()
    })
    
    

@booking_blueprint.route("/my-bookings", methods=["GET"])
def get_user_bookings():
    try:
        email = request.args.get("email")
        phone = request.args.get("phone")

        bookings = get_bookings_by_user(email=email, phone=phone)

        return jsonify({"bookings": bookings}), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        # 👀 log the actual error for debugging
        import traceback; traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
 

@booking_blueprint.route("/feedback/<booking_id>", methods=["POST"])
def submit_feedback(booking_id):
    try:
        data = request.json
        rating = data.get("rating")
        comment = data.get("comment")

        booking = Booking.objects(booking_id=booking_id).first()
        if not booking:
            return jsonify({"error": "Booking not found"}), 404

        booking.feedback = {"rating": rating, "comment": comment}
        booking.save()

        return jsonify({"message": "Feedback submitted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@booking_blueprint.route("/update-bookings/<booking_id>", methods=["PUT"])
def update_booking_route(booking_id):
    try:
        body = request.get_json(force=True)
        result = update_booking_logic(booking_id, body)
        return jsonify(result), 200
    except DoesNotExist:
        return jsonify({"error": "Booking not found"}), 404
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        logger.exception("Unexpected error in update_booking_route")
        return jsonify({"error": str(e)}), 500
