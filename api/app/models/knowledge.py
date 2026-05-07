from sqlalchemy import Boolean, ForeignKey, Integer, Text, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Knowledge(Base):
    __tablename__ = "knowledge"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), index=True)
    content: Mapped[str] = mapped_column(Text)
    category_id: Mapped[int | None] = mapped_column(ForeignKey("categories.id"), nullable=True, index=True)
    sort: Mapped[int] = mapped_column(Integer, default=0)
    level: Mapped[int] = mapped_column(Integer, default=1)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False)
