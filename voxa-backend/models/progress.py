from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Progress(Base):
    __tablename__ = "progress"
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    streak = Column(Integer, default=0)
    level = Column(Integer, default=1)
    badges = Column(String, default="")
    unlocked_scenarios = Column(String, default="")
    last_active = Column(String)