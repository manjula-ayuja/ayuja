
from flask import Blueprint, request, jsonify
from datetime import datetime
from app.models.db_utils import *




complaint_blueprint = Blueprint("complaints", __name__)


@complaint_blueprint.route("/complaint/<booking_id>", methods=["POST"])
def raise_complaint(booking_id):
    try:
        data = request.json
        resident_id = data.get("resident_id")
        category = data.get("category", "general")
        feedback = {
            # "rating": data.get("rating"),
            "comment": data.get("comment")
        }

        booking = Booking.objects(booking_id=booking_id).first()
        if not booking:
            return jsonify({"error": "Booking not found"}), 404

        complaint = Complaint(
            resident_id=resident_id,
            booking=booking,
            category=category,
            feedback=feedback
        )
        complaint.save()

        return jsonify({"message": "Complaint raised successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@complaint_blueprint.route("/get-complaints", methods=["GET"])
def get_user_complaints():
    try:
        email = request.args.get("email")
        phone = request.args.get("phone")
        
        if not email or not phone:
            return jsonify({"error": "Email and phone are required"}), 400

        # Find user by email + phone
        user = User.objects(email=email, phone=phone).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Fetch complaints for that user
        complaints = Complaint.objects(resident_id=user.user_id).select_related()

        # Convert to JSON
        complaints_data = []
        for c in complaints:
            complaints_data.append({
                "complaint_id": c.complaint_id,
                "category": c.category,
                "status": c.status,
                "attachments": c.attachments,
                "feedback": c.feedback,
                # ✅ Pull booking info from reference
                "booking": {
                    "booking_id": c.booking.booking_id if c.booking else None,
                    "service_type": c.booking.service_type if c.booking else None,
                    "date": c.booking.date.isoformat() if c.booking else None,
                    "status": c.booking.status if c.booking else None,
                    "age": c.booking.age,
                    "gender": c.booking.gender,
                    "name": (
                        c.booking.resident.name if c.booking.resident else c.booking.guest_name
                    )
                }
            })

        return jsonify({"complaints": complaints_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
