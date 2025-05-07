from sqlalchemy import Column, Integer, String, Date, ForeignKey, Enum, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum as PyEnum
from models.user import RoleEnum

from database.main import Base


class EventStateEnum(PyEnum):
    scheduled = "scheduled"
    ongoing = "ongoing"
    completed = "completed"
    cancelled = "cancelled"


# ──────────────── Usuario ────────────────


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    date = Column(Date, nullable=False)
    capacity = Column(Integer, nullable=False)
    state = Column(Enum(EventStateEnum), default=EventStateEnum.scheduled)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    creator = relationship("User", back_populates="created_events", foreign_keys=[created_by])

    # Relaciones
    registrations = relationship("EventRegistration", back_populates="event")
    


# ──────────────── Registro a Eventos ────────────────

class EventRegistration(Base):
    __tablename__ = "event_registrations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.asistente)
    registered_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relaciones
    user = relationship("User", back_populates="registrations")
    event = relationship("Event", back_populates="registrations")
