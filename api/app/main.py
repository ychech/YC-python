from fastapi import FastAPI

from app.api.router import api_router
from app.core.settings import settings

app = FastAPI(title=settings.APP_NAME)
app.include_router(api_router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok"}
