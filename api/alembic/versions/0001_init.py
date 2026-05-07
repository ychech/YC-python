from alembic import op
import sqlalchemy as sa

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "categories",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("parent_id", sa.Integer(), nullable=True),
        sa.Column("sort", sa.Integer(), nullable=False, server_default="0"),
    )
    op.create_index("ix_categories_name", "categories", ["name"])
    op.create_index("ix_categories_parent_id", "categories", ["parent_id"])
    op.create_foreign_key("fk_categories_parent", "categories", "categories", ["parent_id"], ["id"])

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("username", sa.String(length=64), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="active"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index("ix_users_username", "users", ["username"], unique=True)
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    op.create_table(
        "knowledge",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("category_id", sa.Integer(), nullable=True),
        sa.Column("sort", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("level", sa.Integer(), nullable=False, server_default="1"),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default=sa.text("false")),
    )
    op.create_index("ix_knowledge_title", "knowledge", ["title"])
    op.create_index("ix_knowledge_category_id", "knowledge", ["category_id"])
    op.create_foreign_key("fk_knowledge_category", "knowledge", "categories", ["category_id"], ["id"])

    op.create_table(
        "questions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("answer", sa.Text(), nullable=False),
        sa.Column("analysis", sa.Text(), nullable=True),
        sa.Column("type", sa.String(length=32), nullable=False),
        sa.Column("knowledge_id", sa.Integer(), nullable=True),
    )
    op.create_index("ix_questions_type", "questions", ["type"])
    op.create_index("ix_questions_knowledge_id", "questions", ["knowledge_id"])
    op.create_foreign_key("fk_questions_knowledge", "questions", "knowledge", ["knowledge_id"], ["id"])

    op.create_table(
        "user_records",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("question_id", sa.Integer(), nullable=False),
        sa.Column("user_answer", sa.Text(), nullable=False),
        sa.Column("is_correct", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index("ix_user_records_user_id", "user_records", ["user_id"])
    op.create_index("ix_user_records_question_id", "user_records", ["question_id"])
    op.create_foreign_key("fk_user_records_user", "user_records", "users", ["user_id"], ["id"])
    op.create_foreign_key("fk_user_records_question", "user_records", "questions", ["question_id"], ["id"])

    op.create_table(
        "study_progress",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("knowledge_id", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=16), nullable=False, server_default="todo"),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.UniqueConstraint("user_id", "knowledge_id", name="uq_progress_user_knowledge"),
    )
    op.create_index("ix_study_progress_user_id", "study_progress", ["user_id"])
    op.create_index("ix_study_progress_knowledge_id", "study_progress", ["knowledge_id"])
    op.create_foreign_key("fk_progress_user", "study_progress", "users", ["user_id"], ["id"])
    op.create_foreign_key("fk_progress_knowledge", "study_progress", "knowledge", ["knowledge_id"], ["id"])

    op.create_table(
        "code_snippets",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("code", sa.Text(), nullable=False),
        sa.Column("language", sa.String(length=32), nullable=False, server_default="python"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
    )
    op.create_index("ix_code_snippets_user_id", "code_snippets", ["user_id"])
    op.create_foreign_key("fk_code_snippets_user", "code_snippets", "users", ["user_id"], ["id"])


def downgrade() -> None:
    op.drop_table("code_snippets")
    op.drop_table("study_progress")
    op.drop_table("user_records")
    op.drop_table("questions")
    op.drop_table("knowledge")
    op.drop_table("users")
    op.drop_table("categories")

