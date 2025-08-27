 
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask,jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os
from dotenv import load_dotenv
from email.mime.base import MIMEBase
from email import encoders

from urllib.parse import urlparse

import logging


load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

# Load allowed origins from environment variable
# origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

# CORS(app, resources={r"/*": {"origins": origins}})

bcrypt = Bcrypt(app)


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s') 
logger = logging.getLogger(__name__) 


# SMTP Email Configuration

SMTP_SERVER = os.getenv('SMTP_SERVER')
SMTP_PORT =  587 
SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')
SMTP_USERNAME = os.getenv('SMTP_USERNAME')
FROM_EMAIL = f'"Ayuja Support" <{os.getenv("FROM_EMAIL")}>'


def send_email(recipient_emails, subject, body, attachments=None):
    try:
        smtp_server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        smtp_server.connect(SMTP_SERVER, SMTP_PORT)
        smtp_server.starttls()
        smtp_server.login(SMTP_USERNAME, SMTP_PASSWORD)

        for recipient_email in recipient_emails:
            message = MIMEMultipart()
            message['From'] = FROM_EMAIL
            message['To'] = recipient_email
            message['Subject'] = subject
            message.attach(MIMEText(body, 'html'))

            # Attach files if provided
            if attachments:
                for file_path in attachments:
                    with open(file_path, "rb") as attachment:
                        part = MIMEBase("application", "octet-stream")
                        part.set_payload(attachment.read())
                        encoders.encode_base64(part)
                        part.add_header(
                            "Content-Disposition",
                            f"attachment; filename= {os.path.basename(file_path)}",
                        )
                        message.attach(part)

            smtp_server.sendmail(SMTP_USERNAME, recipient_email, message.as_string())

        smtp_server.quit()
        logger.info(f"Email sent successfully to all recipients: {recipient_email}.")


    except Exception as e:
        logger.error(f"Error sending email: {e}")
        