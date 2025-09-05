
from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from mongoengine import *
from app.models.db_utils import User, Emergency, Notification
from typing import List

router = APIRouter()

# WebSocket manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_json(message)


manager = ConnectionManager()


# WebSocket endpoint
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()  # keep connection alive
    except WebSocketDisconnect:
        manager.disconnect(websocket)


# Existing emergency routes
@router.post("/emergency-call")
async def raise_emergency(data: dict):
    resident_id = data.get("resident_id")
    geo_location = data.get("geo_location")

    if not resident_id:
        raise HTTPException(status_code=400, detail="resident_id required")

    user = User.objects(user_id=resident_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    emergency = Emergency(
        resident_id=resident_id,
        geo_location=geo_location,
        notified_contacts=user.emergency_contacts,
        status="active"
    ).save()

    for contact in user.emergency_contacts:
        Notification(
            user_id=resident_id,
            type="sms",
            message=f"⚠️ Emergency triggered for {user.name}. Location: {geo_location}"
        ).save()

    # Broadcast to all WebSocket clients
    await manager.broadcast({
        "emergency_id": emergency.emergency_id,
        "resident_id": emergency.resident_id,
        "geo_location": emergency.geo_location,
        "status": emergency.status,
        "created_at": str(emergency.created_at),
    })

    return {"message": "Emergency raised successfully", "emergency_id": emergency.emergency_id}


# emergency_routes_fastapi.py
@router.get("/active")
def get_active_emergencies():
    emergencies = Emergency.objects(status="active").order_by("-created_at")
    result = []
    for e in emergencies:
        user = User.objects(user_id=e.resident_id).first()
        result.append({
            "emergency_id": e.emergency_id,
            "resident_id": e.resident_id,
            "geo_location": e.geo_location,
            "status": e.status,
            "created_at": e.created_at,
            "resident": {
                "name": user.name,
                "email": user.email,
                "phone":user.phone,
                "emergency_contacts": user.emergency_contacts,
                "family_members": getattr(user, "family_members", []),
            } if user else None
        })
    return {"emergencies": result}

@router.put("/resolve/{emergency_id}")
def resolve_emergency(emergency_id: str):
    emergency = Emergency.objects(emergency_id=emergency_id).first()
    if not emergency:
        raise HTTPException(status_code=404, detail="Emergency not found")

    emergency.status = "resolved"
    emergency.save()
    return {"message": "Emergency resolved"}
