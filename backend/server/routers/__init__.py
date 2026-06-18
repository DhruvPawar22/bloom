from fastapi import APIRouter

from server.routers import auth, logs

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(logs.router)