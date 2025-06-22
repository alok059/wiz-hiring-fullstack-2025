from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/events/", response_model=schemas.EventResponse)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    return crud.create_event(db, event)

@app.get("/events/", response_model=list[schemas.EventResponse])
def read_events(db: Session = Depends(get_db)):
    return crud.get_events(db)

@app.get("/events/{event_id}", response_model=schemas.EventDetailResponse)
def read_event(event_id: int, db: Session = Depends(get_db)):
    event = crud.get_event(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Calculate remaining slots
    time_slots = []
    for slot in event.time_slots:
        bookings_count = len(slot.bookings)
        time_slots.append({
            "id": slot.id,
            "start": slot.start,
            "end": slot.end,
            "remaining_slots": slot.max_bookings - bookings_count
        })
    
    return {
        **event.__dict__,
        "time_slots": time_slots
    }

@app.post("/events/{event_id}/bookings", response_model=schemas.BookingCreate)
def book_slot(
    event_id: int,
    booking: schemas.BookingCreate,
    time_slot_id: int,
    db: Session = Depends(get_db)
):
    # Verify time slot belongs to event
    slot = db.query(models.TimeSlot).filter(
        models.TimeSlot.id == time_slot_id,
        models.TimeSlot.event_id == event_id
    ).first()
    if not slot:
        raise HTTPException(status_code=404, detail="Time slot not found")
    
    # Check availability
    if len(slot.bookings) >= slot.max_bookings:
        raise HTTPException(status_code=400, detail="Time slot is full")
    
    created = crud.create_booking(db, booking, time_slot_id)
    if not created:
        raise HTTPException(status_code=400, detail="User already booked this slot")
    return created

@app.get("/users/{email}/bookings", response_model=list[schemas.BookingCreate])
def get_bookings(email: str, db: Session = Depends(get_db)):
    return crud.get_user_bookings(db, email)