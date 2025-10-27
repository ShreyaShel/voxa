from database import SessionLocal
from models.progress_model import UserProgress
from datetime import datetime, timezone
from sqlalchemy.exc import IntegrityError

def test_insert_progress():
    db = SessionLocal()

    # Clean slate
    db.query(UserProgress).delete()
    db.commit()

    # Insert a record
    entry = UserProgress(
        user_id="test_user_001",
        timestamp=datetime.now(timezone.utc),
        transcript="Testing progress logging.",
        feedback={"clarity": "good"},
        metrics={"words_spoken": 5},
        xp=100,
        level=3
    )
    db.add(entry)
    db.commit()

    # Try inserting duplicate
    duplicate = UserProgress(
        user_id="test_user_001",
        timestamp=datetime.now(timezone.utc),
        transcript="Testing progress logging.",
        feedback={"clarity": "good"},
        metrics={"words_spoken": 5},
        xp=100,
        level=3
    )
    try:
        db.add(duplicate)
        db.commit()
        print("❌ Duplicate insert allowed — test failed.")
    except IntegrityError:
        db.rollback()
        print("✅ Duplicate blocked — test passed.")

    # Confirm record exists
    records = db.query(UserProgress).filter_by(user_id="test_user_001").all()
    assert len(records) == 1
    print("✅ Record inserted and verified.")

    db.close()

if __name__ == "__main__":
    test_insert_progress()