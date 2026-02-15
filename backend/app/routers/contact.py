from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter()


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str


@router.post("/contact")
async def submit_contact(data: ContactRequest):
    # TODO: integrate email sending or database storage
    return {"status": "success", "message": "Message received. We'll get back to you soon."}
