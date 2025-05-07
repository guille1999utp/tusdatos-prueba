from sqlalchemy.orm import Session
from fastapi import HTTPException
from schemas.main import UserCreate, UserLogin, UserRolUpdate
from models.user import User, RoleEnum
from passlib.context import CryptContext
from core.security import create_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def register_user(db: Session, user: UserCreate):
    # Verificar si el correo electrónico ya está registrado
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Encriptar la contraseña
    hashed_password = pwd_context.hash(user.password)

    # Crear un nuevo usuario
    db_user = User(email=user.email, hashed_password=hashed_password, name=user.name, role=user.role)
    
    # Agregar el usuario a la base de datos
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Crear el token de acceso
    token = create_access_token(data={"sub": db_user.email, "role": db_user.role})

    # Retornar un mensaje de éxito junto con el token y los datos del usuario
    return {
        "msg": "User created successfully",
        "access_token": token,
        "user": {
            "email": db_user.email,
            "role": db_user.role,
            "name": db_user.name
        }
    }

def list_users(db: Session):
    # Obtener todos los usuarios de la base de datos descartando el campo hashed_password
    users = db.query(User).all()
    for user in users:
        user.hashed_password = None  # Limpiar el campo hashed_password para no exponerlo
    
    # Retornar la lista de usuarios
    return users

def login_user(db: Session, user: UserLogin):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(data={"sub": db_user.email, "role": db_user.role})
    return {"access_token": token, "user": {"email": db_user.email, "role": db_user.role, "name": db_user.name}}

def update_role(db: Session, user_id: int, user: UserRolUpdate, current_user: User):
    # verifico que la persona a actualizar rol sea administrador
    current_user = db.query(User).filter(User.id == current_user.id).first()
    if not current_user or current_user.role != RoleEnum.admin:
        raise HTTPException(status_code=403, detail="Not authorized to update role")
    
    print(user)
    
    # si la persona es admin, verifico que el nuevo rol sea valido
    if user.role not in ["admin", "organizador"]:
        raise HTTPException(status_code=400, detail="Invalid role")
    
    # busco el usuario a actualizar y actualizo su rol
    user_to_update = db.query(User).filter(User.id == user_id).first()
    if not user_to_update:
        raise HTTPException(status_code=404, detail="User not found")
    
    # actualizo el rol
    user_to_update.role = user.role
    db.commit()
    db.refresh(user_to_update)
    return {
        "msg": "User role updated successfully",
    }
    
    

def list_users(db: Session, current_user: User):
    # retorna todos los usuarios de la base de datos excepto el usuario actual
    users = db.query(User).all()
    users = [user for user in users if user.id != current_user.id]  # Excluir el usuario actual
    return users

def list_roles():
    
    # Retorna los roles disponibles
    return [role.value for role in RoleEnum]

def get_user_by_id(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
