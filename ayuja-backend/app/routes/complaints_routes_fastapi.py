
import uuid
from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect, Query
from typing import List, Dict, Any
from app.models.db_utils import Complaint, Booking, User

router = APIRouter()

# ----------------- In-memory connected clients -----------------
connected_clients: List[WebSocket] = []

async def broadcast_update(data: Dict[str, Any]):
    """Send updates to all connected WebSocket clients"""
    for client in connected_clients:
        try:
            await client.send_json(data)
        except Exception:
            continue

# ----------------- Routes for residents -----------------

@router.post("/create-complaint/{booking_id}")
async def raise_complaint(booking_id: str, data: Dict[str, Any]):
    resident_id = data.get("resident_id")
    category = data.get("category", "general")
    feedback = {"comment": data.get("comment")}

    booking = Booking.objects(booking_id=booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    complaint = Complaint(
        resident_id=resident_id,
        booking=booking,
        category=category,
        feedback=feedback
    )
    complaint.save()

    response = {"message": "Complaint raised successfully", "complaint_id": complaint.complaint_id}

    # 🔔 Notify all connected clients
    await broadcast_update({
        "event": "complaint_created",
        "complaint_id": complaint.complaint_id,
        "category": complaint.category,
        "status": complaint.status
    })

    return response


@router.get("/get-complaints")
async def get_user_complaints(email: str = Query(...), phone: str = Query(...)):
    user = User.objects(email=email, phone=phone).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    complaints = Complaint.objects(resident_id=user.user_id).select_related()
    complaints_data = []
    for c in complaints:
        complaints_data.append({
            "complaint_id": c.complaint_id,
            "category": c.category,
            "status": c.status,
            "attachments": c.attachments,
            "feedback": c.feedback,
            "booking": {
                "booking_id": c.booking.booking_id if c.booking else None,
                "service_type": c.booking.service_type if c.booking else None,
                "date": c.booking.date.isoformat() if c.booking else None,
                "status": c.booking.status if c.booking else None,
                "age": c.booking.age,
                "gender": c.booking.gender,
                "name": (
                    c.booking.resident.name if c.booking.resident else c.booking.guest_name
                ),
            },
        })

    return {"complaints": complaints_data}



# ----------------- Routes for admin -----------------

@router.get("/show-complaints")
async def get_complaints():
    complaints = Complaint.objects().to_json()
    import json
    return json.loads(complaints)


@router.patch("/update-complaints/{complaint_id}/status")
async def update_complaint_status(complaint_id: str, status: str):
    complaint = Complaint.objects(complaint_id=complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    if status not in ["open", "in-progress", "resolved", "closed"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    complaint.update(status=status)

    #  Broadcast update
    await broadcast_update({
        "event": "complaint_updated",
        "complaint_id": complaint_id,
        "status": status
    })

    return {"message": f"Complaint status updated to {status}"}

# ----------------- WebSocket -----------------
@router.websocket("/ws/complaints")
async def complaints_ws(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()  # keep alive
    except WebSocketDisconnect:
        connected_clients.remove(websocket)
