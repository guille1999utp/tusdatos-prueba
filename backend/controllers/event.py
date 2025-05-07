from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from models.event import Event, EventRegistration
from models.user import User, RoleEnum
from schemas.main import EventCreate, EventUpdate, EventResponse
from typing import List

# ──────────────── CRUD de Eventos ────────────────

def get_event(db: Session, event_id: int, user: User):
    event = db.query(Event).filter(Event.id == event_id).first()

    total_registrations = 0

    # contar cuantos invitados hay en el evento que sean invitados
    if event:
        guest_registrations = []
        for registration in event.registrations:
            if registration.role == RoleEnum.invitado:
                guest_registrations.append(registration)
        total_registrations = len(guest_registrations)

    # buscar mi rol en el evento
    mi_registro = db.query(EventRegistration).filter(
        EventRegistration.event_id == event_id,
        EventRegistration.user_id == user.id
    ).first()


    return {
        "id": event.id,
        "title": event.title,
        "description": event.description,
        "capacity": event.capacity,
        "date": event.date,
        "state": event.state,
        "registered_count": total_registrations,
        "role": mi_registro.role.__str__() if mi_registro else "invitado",
    } if event else None

def get_events(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Event).offset(skip).limit(limit).all()

def get_my_events(db: Session, user: User, skip: int = 0, limit: int = 10):
    return db.query(Event).filter(Event.created_by == user.id).offset(skip).limit(limit).all()

def get_my_events_registration(db: Session, user: User, skip: int = 0, limit: int = 10):
    registrations = (
        db.query(EventRegistration)
        .filter(EventRegistration.user_id == user.id)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return [reg.event for reg in registrations]


def create_event(db: Session, event: EventCreate, user: User):
    db_event = Event(**event.dict(), created_by=user.id)  # Asegúrate de que 'user_id' se mapea correctamente
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    event = db_event

    event_response = EventResponse(
    id=event.id,
    title=event.title,  # Asegúrate de que 'title' se mapea a 'name'
    description=event.description,
    capacity=event.capacity,
    date=event.date,
    state=event.state
    )
    return event_response

def update_event(db: Session, event_id: int, event: EventUpdate, user: User):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    if(db_event.created_by != user.id and user.role != "admin"):
        raise HTTPException(status_code=403, detail="Not authorized to update this event")

    for key, value in event.dict(exclude_unset=True).items():
        setattr(db_event, key, value)

    db.commit()
    db.refresh(db_event)
    return db_event

def delete_event(db: Session, event_id: int):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")

    db.delete(db_event)
    db.commit()
    return db_event

# ──────────────── Registro a Evento ────────────────

def register_user_to_event(db: Session, user_id: int, event_id: int, role: str, current_user: User):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    if(event.created_by != current_user.id or current_user.role != RoleEnum.admin):
        raise HTTPException(status_code=403, detail="Not authorized to register to this event")

    if len(event.registrations) >= event.capacity:
        raise HTTPException(status_code=400, detail="Event is at full capacity")

    # Verifica si ya está registrado
    already_registered = db.query(EventRegistration).filter_by(user_id=user_id, event_id=event_id).first()
    if already_registered:
        raise HTTPException(status_code=400, detail="User already registered for this event")

    registration = EventRegistration(user_id=user_id, event_id=event_id, role=role.role)
    print(registration.role)
    db.add(registration)
    db.commit()
    db.refresh(registration)
    return {
            "user_id": registration.user_id,
            "event_id": registration.event_id,
            "role": role.role
    }

def update_rol_user_to_event(db: Session, user_id: int, event_id: int, role: str, current_user: User):

    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    if(event.created_by != current_user.id or current_user.role != RoleEnum.admin):
        raise HTTPException(status_code=403, detail="Not authorized to update this event")

    registration = db.query(EventRegistration).filter_by(user_id=user_id, event_id=event_id).first()

    if not registration:
        raise HTTPException(status_code=404, detail="User not registered for this event")

    registration.role = role.role
    db.commit()
    db.refresh(registration)
    return {
            "user_id": registration.user_id,
            "event_id": registration.event_id,
            "role": role.role
    }

def register_to_guest_endpoint(db: Session, event_id: int, current_user: User):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    if len(event.registrations) >= event.capacity:
        raise HTTPException(status_code=400, detail="Event is at full capacity")
    
    #admin no puede registrarse como invitado el mismo evento
    if current_user.role == RoleEnum.admin and event.created_by == current_user.id:
        raise HTTPException(status_code=400, detail="Admin cannot register as a guest for the same event")

    # Verifica si ya está registrado
    already_registered = db.query(EventRegistration).filter_by(user_id=current_user.id, event_id=event_id).first()
    if already_registered:
        raise HTTPException(status_code=400, detail="User already registered for this event")

    registration = EventRegistration(user_id=current_user.id, event_id=event_id, role="invitado")
    db.add(registration)
    db.commit()
    db.refresh(registration)
    return {
            "user_id": registration.user_id,
            "event_id": registration.event_id,
            "role": "invitado"
    }

# ──────────────── Búsqueda de Eventos ────────────────

def search_events_by_title(db: Session, search_query: str) -> List[Event]:
    return db.query(Event).filter(Event.title.ilike(f"%{search_query}%")).all()