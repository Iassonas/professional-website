import smtplib
import traceback
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.config import CONTACT_EMAIL, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD

router = APIRouter()


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str


def send_email(data: ContactRequest):
    print(f"[CONTACT] Config check — HOST={SMTP_HOST}, PORT={SMTP_PORT}, USER={SMTP_USER!r}, TO={CONTACT_EMAIL}")
    print(f"[CONTACT] PASSWORD set: {bool(SMTP_PASSWORD)} (length: {len(SMTP_PASSWORD)})")

    msg = MIMEMultipart()
    msg["From"] = SMTP_USER
    msg["To"] = CONTACT_EMAIL
    msg["Subject"] = f"New contact from {data.name}"
    msg["Reply-To"] = data.email

    body = (
        f"Name: {data.name}\n"
        f"Email: {data.email}\n\n"
        f"Message:\n{data.message}"
    )
    msg.attach(MIMEText(body, "plain"))

    print("[CONTACT] Connecting to SMTP server...")
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        print("[CONTACT] Starting TLS...")
        server.starttls()
        print("[CONTACT] Logging in...")
        server.login(SMTP_USER, SMTP_PASSWORD)
        print("[CONTACT] Sending message...")
        server.send_message(msg)
        print("[CONTACT] Sent successfully!")


@router.post("/contact")
async def submit_contact(data: ContactRequest):
    try:
        send_email(data)
    except Exception as e:
        print(f"[CONTACT ERROR] {type(e).__name__}: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again later.")
    return {"status": "success", "message": "Thanks! I'll get back to you soon."}
