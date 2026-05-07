from fastapi import APIRouter

from app.api.routes import auth, knowledge

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(knowledge.router, prefix="/knowledge", tags=["knowledge"])

