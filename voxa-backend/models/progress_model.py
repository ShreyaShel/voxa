from sqlalchemy import Column, String, Integer, DateTime, JSON, UniqueConstraint
from database import Base

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    timestamp = Column(DateTime)
    transcript = Column(String)
    feedback = Column(JSON)
    metrics = Column(JSON)
    xp = Column(Integer)
    level = Column(Integer)

    __table_args__ = (
        UniqueConstraint("user_id", "transcript", "xp", "level", name="uq_user_progress"),
    )