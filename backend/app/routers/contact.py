"""
routers/contact.py
------------------------------------------------------------------
The one WRITE endpoint in this API (everything else is read-only).
Called by src/components/Contact.tsx when someone submits the
contact form. Saves to PostgreSQL always; email notification is
optional and disabled until you fill in EMAIL_API_KEY (see .env.example).
------------------------------------------------------------------
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_db
from app.models import ContactMessage
from app.schemas import ContactIn, ContactOut

router = APIRouter(prefix="/api/contact", tags=["contact"])
settings = get_settings()


@router.post("/", response_model=ContactOut)
def submit_contact(payload: ContactIn, db: Session = Depends(get_db)):
    # payload is already validated by Pydantic's ContactIn schema
    # (e.g. `email` must be a real email shape) before this line runs.
    entry = ContactMessage(name=payload.name, email=payload.email, message=payload.message)
    db.add(entry)
    db.commit()
    db.refresh(entry)  # pulls back the DB-generated id + created_at

    # ---- OPTIONAL: send yourself an email notification -------------
    # This is off by default. To enable:
    #   1. pip install resend  (or your provider's SDK)
    #   2. set EMAIL_API_KEY, EMAIL_FROM, EMAIL_TO in backend/.env
    #   3. uncomment the block below
    #
    # if settings.EMAIL_API_KEY:
    #     import resend
    #     resend.api_key = settings.EMAIL_API_KEY
    #     resend.Emails.send({
    #         "from": settings.EMAIL_FROM,
    #         "to": settings.EMAIL_TO,
    #         "subject": f"Portfolio contact from {payload.name}",
    #         "text": payload.message,
    #     })

    return entry
