from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.models.category import Category
from app.models.knowledge import Knowledge
from app.schemas.knowledge import CategoryOut, KnowledgeOut

router = APIRouter()


@router.get("/categories", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    rows = db.execute(select(Category).order_by(Category.parent_id.asc().nullsfirst(), Category.sort.asc())).scalars()
    return [CategoryOut(id=c.id, name=c.name, parent_id=c.parent_id, sort=c.sort) for c in rows]


@router.get("/items", response_model=list[KnowledgeOut])
def list_knowledge(db: Session = Depends(get_db)):
    rows = db.execute(select(Knowledge).order_by(Knowledge.sort.asc())).scalars()
    return [
        KnowledgeOut(
            id=k.id,
            title=k.title,
            content=k.content,
            category_id=k.category_id,
            sort=k.sort,
            level=k.level,
            is_published=k.is_published,
        )
        for k in rows
    ]


@router.get("/items/{knowledge_id}", response_model=KnowledgeOut)
def get_knowledge(knowledge_id: int, db: Session = Depends(get_db)):
    k = db.get(Knowledge, knowledge_id)
    if not k:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    return KnowledgeOut(
        id=k.id,
        title=k.title,
        content=k.content,
        category_id=k.category_id,
        sort=k.sort,
        level=k.level,
        is_published=k.is_published,
    )
