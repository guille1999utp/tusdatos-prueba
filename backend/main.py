from fastapi import FastAPI
from database.main import engine, Base
from api.routes import auth, event
from fastapi.middleware.cors import CORSMiddleware
import logging

Base.metadata.create_all(bind=engine)

logging.basicConfig(level=logging.INFO)

origins = [
    "http://localhost:5174",  # Next.js local
    "https://tudominio.com",  # Producción
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Puedes usar ["*"] para permitir todo (no recomendado en producción)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(event.router, prefix="/event", tags=["event"])