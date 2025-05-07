from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database.main import get_db
from schemas.main import Event, EventCreate, EventUpdate, EventRegistrationBase, EventResponse, UserRolUpdate
from controllers.event import (
    get_event,
    get_events,
    create_event,
    update_event,
    delete_event,
    register_user_to_event,
    search_events_by_title,
    update_rol_user_to_event,
    register_to_guest_endpoint,
    get_my_events,
    get_my_events_registration
)
from models.user import User
from core.security import get_current_user

router = APIRouter()

# ──────────────── CRUD ────────────────

@router.post("/", response_model=EventResponse)
def create_event_endpoint(event: EventCreate, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return create_event(db, event, current_user)

@router.get("/", response_model=List[EventResponse])
def get_events_endpoint(skip: int = 0, limit: int = 10, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return get_events(db, skip=skip, limit=limit)

@router.get("/my-events", response_model=List[EventResponse])
def get_my_events_endpoint(skip: int = 0, limit: int = 10, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return get_my_events(db, skip=skip, limit=limit,user=current_user)

@router.get("/my-events-registers", response_model=List[EventResponse])
def get_my_events_endpoint(skip: int = 0, limit: int = 10, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return get_my_events_registration(db, skip=skip, limit=limit,user=current_user)

@router.get("/{event_id}", response_model=EventResponse)
def get_event_endpoint(event_id: int, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    db_event = get_event(db, event_id, current_user)
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@router.put("/{event_id}", response_model=EventResponse)
def update_event_endpoint(event_id: int, event: EventUpdate, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return update_event(db, event_id, event, current_user)

@router.delete("/{event_id}", response_model=EventResponse)
def delete_event_endpoint(event_id: int, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return delete_event(db, event_id)

# ──────────────── Registro de usuario ────────────────

@router.post("/{event_id}/register/{user_id}", response_model=EventRegistrationBase)
def register_to_event_endpoint(event_id: int, user_id: int, role: UserRolUpdate, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return register_user_to_event(db, user_id=user_id, event_id=event_id, role=role, current_user=current_user)

# ──────────────── actualizar rol de usuario ────────────────

@router.put("/{event_id}/register/{user_id}", response_model=EventRegistrationBase)
def update_to_event_endpoint(event_id: int, user_id: int, role: UserRolUpdate, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return update_rol_user_to_event(db, user_id=user_id, event_id=event_id, role=role, current_user=current_user)

# ──────────────── registrarme al evento como invitado ────────────────

@router.post("/{event_id}", response_model=EventRegistrationBase)
def register_guest_endpoint(event_id: int, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return register_to_guest_endpoint(db, event_id=event_id, current_user=current_user)

# ──────────────── Búsqueda por título ────────────────

@router.get("/search/by-title/", response_model=List[EventResponse])
def search_events_endpoint(query: str, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return search_events_by_title(db, query)
