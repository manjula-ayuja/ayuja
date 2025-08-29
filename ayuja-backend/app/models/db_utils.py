from datetime import datetime
import firebase_admin
from firebase_admin import credentials, auth, storage
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from mongoengine import (
    Document, CASCADE, StringField, ReferenceField, 
    EmailField, connect, disconnect, EmbeddedDocument, 
    ListField, EmbeddedDocumentField, DateTimeField, 
    ObjectIdField, DictField, FloatField
)
from flask_bcrypt import Bcrypt
import os
import uuid
from flask_cors import CORS

# Base path of backend
base = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))

cred_path = os.path.join(base, 'FirbaseServices', 'ayuja-d237b-firebase-adminsdk-fbsvc-0d283915d7.json')
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred, {
    'storageBucket': 'ayuja-d237b.appspot.com'   
})
bucket = storage.bucket()


# MongoDB connection
MONGO_DB_URI = os.getenv("MONGO_DB_URI")
connect('Ayuja', host=MONGO_DB_URI)

# Flask app & bcrypt
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)


# User Schema
class User(Document):
    user_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)
    name = StringField(required=True, max_length=100)
    role = StringField(choices=["resident", "admin", "superadmin","staff","other"], required=True)
    email = EmailField(required=True, unique=True)
    phone = StringField(required=True, unique=True)
    password_hash = StringField(required=True)
    firebaseUid = StringField()
    emergency_contacts = ListField(StringField()) 
    family_members = ListField(StringField())    
    documents = ListField(DictField())             
    otp = StringField() 
    meta = {"collection": "users"}
    
    # Hash password before saving
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    # Check password validity
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    


# Booking Schema
class Booking(Document):
    booking_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)

    # Reference to User
    resident = ReferenceField(User, required=True, reverse_delete_rule=CASCADE)  

    service_type = StringField(required=True)
    date = DateTimeField(required=True)
    status = StringField(
        choices=["new", "assigned", "in-progress", "completed", "cancelled"],
        default="new"
    )
    staff_id = StringField()
    notes = StringField()
    invoice_url = StringField()
    prescriptions = ListField(DictField())  
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {"collection": "bookings"}





# 3. Payment Schema
class Payment(Document):
    payment_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)
    booking_id = StringField(required=True)  
    amount = FloatField(required=True)
    method = StringField(choices=["upi", "card", "wallet"], required=True)
    status = StringField(choices=["success", "failed", "refunded"], required=True)
    transaction_history = ListField(DictField())   # can store each txn detail
    discount_code = StringField()
    meta = {"collection": "payments"}


# 4. Complaint Schema
class Complaint(Document):
    complaint_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)
    resident_id = StringField(required=True)
    booking_id = StringField()
    category = StringField(required=True)  # e.g. service delay, staff issue
    status = StringField(choices=["open", "in-progress", "resolved", "closed"], default="open")
    attachments = ListField(StringField())  # S3 urls
    feedback = DictField()  # {"rating": int, "comments": str}
    meta = {"collection": "complaints"}


# 5. Emergency Schema
class Emergency(Document):
    emergency_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)
    resident_id = StringField(required=True)
    geo_location = DictField()   # {"lat": float, "lng": float}
    status = StringField(choices=["active", "resolved"], default="active")
    notified_contacts = ListField(StringField())
    created_at = DateTimeField(default=datetime.utcnow)
    meta = {"collection": "emergencies"}


# 6. Notification Schema
class Notification(Document):
    notification_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)
    user_id = StringField(required=True)
    type = StringField(choices=["push", "sms", "email"], required=True)
    message = StringField(required=True)
    status = StringField(choices=["sent", "failed"], default="sent")
    created_at = DateTimeField(default=datetime.utcnow)
    meta = {"collection": "notifications"}