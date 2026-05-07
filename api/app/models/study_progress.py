from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class StudyProgress(Base):
    __tablename__ = "study_progress"
    __table_args__ = (UniqueConstraint("user_id", "knowledge_id", name="uq_progress_user_knowledge"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    knowledge_id: Mapped[int] = mapped_column(ForeignKey("knowledge.id"), index=True)
    status: Mapped[str] = mapped_column(String(16), default="todo")
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
