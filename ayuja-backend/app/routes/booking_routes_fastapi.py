

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from .ws_manager import booking_ws_manager
from app.models.db_utils import *  # Import your Booking model
from mongoengine.queryset.visitor import Q
from typing import List
from datetime import datetime
import json

router = APIRouter()


def serialize_booking(booking: Booking):
    payment_amount = getattr(booking.payment, "amount", None) if booking.payment else None
    payment_status = getattr(booking.payment, "status", None) if booking.payment else None

    return {
        "booking_id": booking.booking_id,
        "resident_name": booking.resident.name if booking.resident else booking.guest_name,
        "age": booking.age,
        "service_type": booking.service_type,
        "gender": booking.gender if booking.gender else booking.guest_gender,
        "date": booking.date.isoformat() if booking.date else None,
        "payment_amount": payment_amount,
        "payment_status": payment_status,
    }

@router.websocket("/ws/booking")
async def websocket_booking(ws: WebSocket):
    await booking_ws_manager.connect(ws)
    try:
        # Send current booking list immediately after connection
        bookings = Booking.objects()  # Fetch all bookings from MongoDB
        bookings_list = [serialize_booking(b) for b in bookings]
        await ws.send_json(bookings_list)

        # Keep listening (optional, if frontend wants to send data)
        while True:
            data = await ws.receive_json()
            # Optional: broadcast received data to all clients
            await booking_ws_manager.broadcast(data)

    except WebSocketDisconnect:
        booking_ws_manager.disconnect(ws)
