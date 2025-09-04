



# from fastapi import FastAPI, WebSocket, WebSocketDisconnect
# from fastapi.middleware.cors import CORSMiddleware
# from pymongo import MongoClient
# from datetime import datetime
# import uuid
# import json
# import asyncio

# app = FastAPI()

# # Enable CORS to allow frontend connections if needed
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Adjust for your frontend domain
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # MongoDB Setup
# client = MongoClient("mongodb://localhost:27017/")
# db = client["Ayuja"]
# bookings_collection = db["bookings"]

# @app.websocket("/ws/bookings")
# async def websocket_bookings(websocket: WebSocket):
#     await websocket.accept()
#     try:
#         while True:
#             bookings = list(bookings_collection.find({}, {'_id': 0}))
#             print(f"Sending {len(bookings)} bookings")
#             await websocket.send_text(json.dumps(bookings))
#             try:
#                 # Wait for client message, timeout after 20 seconds
#                 await asyncio.wait_for(websocket.receive_text(), timeout=20)
#             except asyncio.TimeoutError:
#                 # If no message, continue sending updates
#                 pass
#     except WebSocketDisconnect:
#         print("WebSocket disconnected")
#     except Exception as e:
#         print(f"WebSocket error: {e}")
#         await websocket.close()

# # POST endpoint for creating new booking (optional)
# from fastapi import Request

# @app.post("/bookings")
# async def create_booking(request: Request):
#     data = await request.json()
#     new_booking = {
#         "booking_id": str(uuid.uuid4()),
#         "resident_id": data.get("resident_id", str(uuid.uuid4())),
#         "service_type": data.get("service_type", ""),
#         "date": data.get("date", datetime.utcnow().isoformat()),
#         "status": data.get("status", "new"),
#         "staff_id": data.get("staff_id", ""),
#         "notes": data.get("notes", ""),
#         "invoice_url": data.get("invoice_url", ""),
#         "created_at": datetime.utcnow().isoformat()
#     }
#     result = bookings_collection.insert_one(new_booking)
#     print(f"Inserted booking with id: {result.inserted_id}")
#     return {"message": "Booking created", "booking_id": new_booking["booking_id"]}





from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import uuid
import json
import asyncio

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client["Ayuja"]
bookings_collection = db["bookings"]

# ✅ Custom JSON Encoder
class MongoJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)  # Convert ObjectId → string
        if isinstance(obj, datetime):
            return obj.isoformat()  # Convert datetime → ISO string
        return super().default(obj)

@app.websocket("/ws/bookings")
async def websocket_bookings(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            bookings = list(bookings_collection.find({}))
            print(f"Sending {len(bookings)} bookings")

            # Use custom encoder to handle ObjectId/datetime
            await websocket.send_text(json.dumps(bookings, cls=MongoJSONEncoder))

            try:
                # Wait for client message, timeout after 20 seconds
                await asyncio.wait_for(websocket.receive_text(), timeout=20)
            except asyncio.TimeoutError:
                # No client message → keep sending updates
                pass
    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close()

@app.post("/bookings")
async def create_booking(request: Request):
    data = await request.json()
    new_booking = {
        "booking_id": str(uuid.uuid4()),
        "resident_id": data.get("resident_id", str(uuid.uuid4())),
        "service_type": data.get("service_type", ""),
        "date": data.get("date", datetime.utcnow()),
        "status": data.get("status", "new"),
        "staff_id": data.get("staff_id", ""),
        "notes": data.get("notes", ""),
        "invoice_url": data.get("invoice_url", ""),
        "created_at": datetime.utcnow(),
    }
    result = bookings_collection.insert_one(new_booking)
    print(f"Inserted booking with id: {result.inserted_id}")
    return {"message": "Booking created", "booking_id": new_booking["booking_id"]}
