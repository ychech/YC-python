from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), index=True)
    parent_id: Mapped[int | None] = mapped_column(ForeignKey("categories.id"), nullable=True, index=True)
    sort: Mapped[int] = mapped_column(Integer, default=0)
