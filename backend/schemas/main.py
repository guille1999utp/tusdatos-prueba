from pydantic import BaseModel, EmailStr, validator, Field
from datetime import date, datetime
from typing import Optional, Literal
from models.event import EventStateEnum

# ──────────────── Roles ────────────────

ValidRoles = Literal["admin", "organizador", "asistente","invitado"]


# ──────────────── Usuarios ────────────────

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        orm_mode = True  # Permite que FastAPI convierta las instancias de SQLAlchemy a diccionarios

class UserBase(BaseModel):
    email: EmailStr
    role: ValidRoles = "admin"

class UserCreate(UserBase):
    email: EmailStr
    password: str
    role: Literal["admin", "organizador", "asistente", "invitado"] = "admin"
    name: str

class UserRolUpdate(BaseModel):
    role: Literal["admin", "organizador", "asistente", "invitado"] = "admin"

class User(UserBase):
    id: int
    created_at: datetime

class UserUpdate(BaseModel):
    pass

# ──────────────── Eventos ────────────────

ValidEventStates = Literal["scheduled", "ongoing", "completed", "cancelled"]


class EventBase(BaseModel):
    title: str
    description: Optional[str]
    date: date
    capacity: int
    state: ValidEventStates = "scheduled"

    @validator("capacity")
    def capacity_must_be_positive(cls, v):
        if v < 1:
            raise ValueError("La capacidad debe ser mayor a 0")
        return v


class EventCreate(EventBase):
    pass

class EventUpdate(EventBase):
    pass

class Event(EventBase):
    id: int
    registered_count: Optional[int] = 0


# ──────────────── Registro de Asistentes ────────────────

class EventRegistrationBase(BaseModel):
    user_id: int
    event_id: int
    role: Literal["admin", "organizador", "asistente", "invitado"] = "admin"

class EventRegistrationCreate(EventRegistrationBase):
    pass

class EventRegistration(EventRegistrationBase):
    id: int
    registered_at: datetime

# Schema para la salida de EventRegistration
class EventRegistrationOut(EventRegistrationBase):
    id: int
    registered_at: datetime


    class Config:
        from_attributes = True

# ──────────────── EventResponse (Pydantic) ────────────────
class EventResponse(BaseModel):
    id: int
    title: str
    description: str
    capacity: int
    date: date
    state: EventStateEnum
    registered_count: Optional[int] = 0
    role: Optional[ValidRoles] = None

    class Config:
        orm_mode = True

class UpdateResponse(BaseModel):
    msg: str
    class Config:
        orm_mode = True