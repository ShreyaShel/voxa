from models.progress_model import UserProgress
from database import SessionLocal

def save_user_progress(user_id: str, transcript: str, feedback: dict, metrics: dict):
    db = SessionLocal()
    xp = metrics.get("xp", 0)

    # Get latest progress
    previous = db.query(UserProgress).filter_by(user_id=user_id).order_by(UserProgress.timestamp.desc()).first()
    total_xp = (previous.xp if previous else 0) + xp
    level = 1 + (total_xp // 100)

    progress = UserProgress(
        user_id=user_id,
        transcript=transcript,
        feedback=feedback,
        metrics=metrics,
        xp=total_xp,
        level=level
    )
    db.add(progress)
    db.commit()
    db.close()