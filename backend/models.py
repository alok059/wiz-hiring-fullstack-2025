from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)

    time_slots = relationship("TimeSlot", back_populates="event")

class TimeSlot(Base):
    __tablename__ = "timeslots"
    id = Column(Integer, primary_key=True, index=True)
    start = Column(DateTime, nullable=False)
    end = Column(DateTime, nullable=False)
    max_bookings = Column(Integer, default=1)
    event_id = Column(Integer, ForeignKey("events.id"))
    
    event = relationship("Event", back_populates="time_slots")
    bookings = relationship("Booking", back_populates="time_slot")

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String, index=True)
    user_email = Column(String, index=True)
    time_slot_id = Column(Integer, ForeignKey("timeslots.id"))
    
    time_slot = relationship("TimeSlot", back_populates="bookings")