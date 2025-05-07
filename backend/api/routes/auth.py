from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.main import UserCreate, UserLogin, UserResponse, UpdateResponse, UserRolUpdate, ValidRoles
from database.main import get_db
from controllers.auth import (
    register_user,
    login_user,
    list_users,
    update_role,
    list_roles
)
from models.user import User
from core.security import get_current_user

from typing import List
router = APIRouter()

@router.post("/register", response_model=dict)
def register_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(db, user)

@router.get("/list/users", response_model=List[UserResponse])
def register_user_endpoint( db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return list_users(db,current_user)

@router.get("/list/roles", response_model=List[ValidRoles])
def list_roles_endpoint():
    return list_roles()

@router.post("/login", response_model=dict)
def login_user_endpoint(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(db, user)

@router.put("/role/{user_id}", response_model=UpdateResponse)
def update_role_endpoint(user_id: str, user: UserRolUpdate, db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return update_role(db, user_id, user, current_user)