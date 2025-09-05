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


cred_path = os.path.join(base, 'FirbaseServices', 'ayuja-d237b-firebase-adminsdk-fbsvc-295b8c6ef6.json')

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
    address = StringField()
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
    

#  Payment Schema
class Payment(EmbeddedDocument):
    payment_id = StringField(default=lambda: str(uuid.uuid4()), unique=True) 
    amount = FloatField(required=True)
    method = StringField(choices=["upi", "card", "wallet","offline"], required=True)
    status = StringField(choices=["success", "failed", "refunded", "cancelled"], required=True)
    transaction_history = ListField(DictField())  
    discount_code = StringField()
    meta = {"collection": "payments"}

# Booking Schema
class Booking(Document):
    booking_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)

    # Reference to User (if registered)
    resident = ReferenceField(User, required=False, reverse_delete_rule=CASCADE)

    # Guest details if no user found
    guest_name = StringField()
    guest_email = StringField()
    guest_phone = StringField()
    guest_gender = StringField()

    service_type = StringField(required=True)
    gender = StringField(required=True)  # still keeping for consistency
    date = DateTimeField(required=True)
    age = StringField(required=True)
    status = StringField(
        choices=["new", "assigned", "in-progress", "completed", "cancelled"],
        default="new"
    )
    staff_id = StringField()
    notes = StringField()
    invoice_url = StringField()
    prescriptions = ListField(DictField())
    created_at = DateTimeField(default=datetime.utcnow)
    
        # Embedded Payment
    payment = EmbeddedDocumentField(Payment)
    
    feedback = DictField() 

    meta = {"collection": "bookings"}






# Complaint Schema
class Complaint(Document):
    complaint_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)
    resident_id = StringField(required=True)
    booking = ReferenceField("Booking", required=False, reverse_delete_rule=CASCADE)
    category = StringField(required=True)  # e.g. service delay, staff issue
    status = StringField(choices=["open", "in-progress", "resolved", "closed"], default="open")
    attachments = ListField(StringField())  # S3 urls
    feedback = DictField()  # {"rating": int, "comments": str}
    meta = {"collection": "complaints"}


# Emergency Schema
class Emergency(Document):
    emergency_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)
    resident_id = StringField(required=True)
    geo_location = DictField()   # {"lat": float, "lng": float}
    status = StringField(choices=["active", "resolved"], default="active")
    notified_contacts = ListField(StringField())
    created_at = DateTimeField(default=datetime.utcnow)
    meta = {"collection": "emergencies"}


# Notification Schema
class Notification(Document):
    notification_id = StringField(default=lambda: str(uuid.uuid4()), unique=True)
    user_id = StringField(required=True)
    type = StringField(choices=["push", "sms", "email"], required=True)
    message = StringField(required=True)
    status = StringField(choices=["sent", "failed"], default="sent")
    created_at = DateTimeField(default=datetime.utcnow)
    meta = {"collection": "notifications"}