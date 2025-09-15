

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from .ws_manager import booking_ws_manager
from app.models.db_utils import *  # Import your Booking model
from mongoengine.queryset.visitor import Q
from typing import List
from datetime import datetime
import json
import asyncio

router = APIRouter()


def serialize_booking(booking: Booking):
    payment_amount = getattr(booking.payment, "amount", None) if booking.payment else None
    payment_status = getattr(booking.payment, "status", None) if booking.payment else None

    return {
        "booking_id": booking.booking_id,
        # "resident_name": booking.resident.name if booking.resident else booking.guest_name,
        "resident_name": booking.guest_name,
        "age": booking.age,
        "status": booking.status,
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
        bookings = Booking.objects()
        bookings_list = [serialize_booking(b) for b in bookings]
        await ws.send_json(bookings_list)

        # Wait indefinitely until disconnect
        while True:
            await asyncio.sleep(5)  # keep alive loop
    except WebSocketDisconnect:
        booking_ws_manager.disconnect(ws)
