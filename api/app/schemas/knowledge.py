from pydantic import BaseModel


class CategoryOut(BaseModel):
    id: int
    name: str
    parent_id: int | None
    sort: int


class KnowledgeOut(BaseModel):
    id: int
    title: str
    content: str
    category_id: int | None
    sort: int
    level: int
    is_published: bool
