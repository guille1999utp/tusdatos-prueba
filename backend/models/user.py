from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from enum import Enum as PyEnum

from database.main import Base


# ──────────────── Enumeraciones ────────────────

class RoleEnum(PyEnum):
    admin = "admin"
    organizador = "organizador"
    asistente = "asistente"
    invitado = "invitado"

    # Definición de los roles
    @classmethod
    def list_roles(cls):
        return [role.value for role in cls]
    
    # metodo para convertir la instancia actual a string
    def __str__(self):
        return self.value

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), default=RoleEnum.admin)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    created_events = relationship("Event", back_populates="creator")

    # Relaciones
    registrations = relationship("EventRegistration", back_populates="user")

