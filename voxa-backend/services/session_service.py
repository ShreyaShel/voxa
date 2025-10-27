from sqlalchemy.orm import Session
from models.session import Session as SessionModel
from database import SessionLocal

def save_session(user_id, scenario, transcript, grammar_score, emotion_score, feedback_message, xp_earned):
    db = SessionLocal()
    session = SessionModel(
        user_id=user_id,
        scenario=scenario,
        transcript=transcript,
        grammar_score=grammar_score,
        emotion_score=emotion_score,
        feedback_message=feedback_message,
        xp_earned=xp_earned
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session

def get_history(user_id):
    db = SessionLocal()
    return db.query(SessionModel).filter(SessionModel.user_id == user_id).order_by(SessionModel.created_at.desc()).all()