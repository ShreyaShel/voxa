from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from database import Base
from datetime import datetime

class Session(Base):
    __tablename__ = "sessions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    scenario = Column(String)
    transcript = Column(String)
    grammar_score = Column(String)
    emotion_score = Column(String)
    feedback_message = Column(String)
    xp_earned = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)