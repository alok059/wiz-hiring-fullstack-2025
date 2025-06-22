from datetime import datetime
from pydantic import BaseModel, EmailStr

class TimeSlotCreate(BaseModel):
    start: datetime
    end: datetime
    max_bookings: int = 1

class EventCreate(BaseModel):
    title: str
    description: str
    time_slots: list[TimeSlotCreate]

class EventResponse(BaseModel):
    id: int
    title: str
    description: str

class BookingCreate(BaseModel):
    user_name: str
    user_email: EmailStr

class EventDetailResponse(EventResponse):
    class TimeSlotResponse(BaseModel):
        id: int
        start: datetime
        end: datetime
        remaining_slots: int
    time_slots: list[TimeSlotResponse]