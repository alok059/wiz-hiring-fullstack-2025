from sqlalchemy.orm import Session
import models
import schemas
def create_event(db: Session, event: schemas.EventCreate):
    db_event = models.Event(title=event.title, description=event.description)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    for slot in event.time_slots:
        db_slot = models.TimeSlot(
            start=slot.start,
            end=slot.end,
            max_bookings=slot.max_bookings,
            event_id=db_event.id
        )
        db.add(db_slot)
    db.commit()
    return db_event

def get_events(db: Session):
    return db.query(models.Event).all()

def get_event(db: Session, event_id: int):
    return db.query(models.Event).filter(models.Event.id == event_id).first()

def create_booking(db: Session, booking: schemas.BookingCreate, time_slot_id: int):
    # Check existing bookings
    existing = db.query(models.Booking).filter(
        models.Booking.time_slot_id == time_slot_id,
        models.Booking.user_email == booking.user_email
    ).first()
    if existing:
        return None
    
    db_booking = models.Booking(
        **booking.dict(),
        time_slot_id=time_slot_id
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_user_bookings(db: Session, email: str):
    return db.query(models.Booking).filter(
        models.Booking.user_email == email
    ).all()