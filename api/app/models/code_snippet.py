from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class CodeSnippet(Base):
    __tablename__ = "code_snippets"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    title: Mapped[str] = mapped_column(String(255))
    code: Mapped[str] = mapped_column(Text)
    language: Mapped[str] = mapped_column(String(32), default="python")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
