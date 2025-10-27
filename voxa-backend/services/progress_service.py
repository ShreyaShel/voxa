import aiosqlite
import json
from datetime import datetime

DB_PATH = "data/user_sessions.db"

async def init_db():
    async with aiosqlite.connect(DB_PATH) as db:
        # Create base table if it doesn't exist
        await db.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                transcript TEXT,
                grammar_feedback TEXT,
                tone TEXT,
                timestamp TEXT
            )
        """)
        await db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password_hash TEXT
            )
        """)
        await db.commit()

        # Check for missing columns
        cursor = await db.execute("PRAGMA table_info(sessions)")
        columns = [row[1] for row in await cursor.fetchall()]

        # Add missing columns if needed
        if "user_id" not in columns:
            await db.execute("ALTER TABLE sessions ADD COLUMN user_id TEXT")
        if "difficulty" not in columns:
            await db.execute("ALTER TABLE sessions ADD COLUMN difficulty TEXT")
        await db.commit()

def estimate_difficulty(transcript: str, tone: str) -> str:
    word_count = len(transcript.split())
    if tone == "nervous" or word_count < 5:
        return "easy"
    elif word_count < 15:
        return "medium"
    else:
        return "hard"

async def log_session(user_id: str, transcript: str, grammar_feedback: list[str], tone: str):
    await init_db()
    difficulty = estimate_difficulty(transcript, tone)
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            INSERT INTO sessions (user_id, transcript, grammar_feedback, tone, difficulty, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            user_id,
            transcript,
            json.dumps(grammar_feedback),
            tone,
            difficulty,
            datetime.utcnow().isoformat()
        ))
        await db.commit()

def score_session(transcript: str, grammar_feedback: list[str], tone: str):
    grammar_score = max(0, 100 - len(grammar_feedback) * 20)

    tone_map = {
        "confident": 100,
        "neutral": 70,
        "nervous": 40,
        "low_energy": 30
    }
    tone_score = tone_map.get(tone.lower(), 50)

    fluency_score = min(100, len(transcript.split()) * 2)
    xp = int((grammar_score + tone_score + fluency_score) / 3)

    return {
        "grammar_score": grammar_score,
        "tone_score": tone_score,
        "fluency_score": fluency_score,
        "xp": xp
    }

async def get_progress(user_id: str):
    await init_db()
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("""
            SELECT transcript, grammar_feedback, tone
            FROM sessions
            WHERE user_id = ?
            ORDER BY timestamp DESC
            LIMIT 1
        """, (user_id,))
        row = await cursor.fetchone()

        if row:
            transcript, grammar_feedback_json, tone = row
            try:
                grammar_feedback = json.loads(grammar_feedback_json)
            except (json.JSONDecodeError, TypeError):
                grammar_feedback = []
            scores = score_session(transcript, grammar_feedback, tone)
        else:
            scores = {
                "grammar_score": 0,
                "tone_score": 0,
                "fluency_score": 0,
                "xp": 0
            }

        cursor = await db.execute("SELECT COUNT(*) FROM sessions WHERE user_id = ?", (user_id,))
        total_sessions = (await cursor.fetchone())[0]

        return {
            "total_sessions": total_sessions,
            "latest_scores": scores
        }

async def get_history(user_id: str):
    await init_db()
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("""
            SELECT transcript, grammar_feedback, tone, difficulty, timestamp
            FROM sessions
            WHERE user_id = ?
            ORDER BY timestamp DESC
        """, (user_id,))
        rows = await cursor.fetchall()

        history = []
        for row in rows:
            transcript, grammar_feedback_json, tone, difficulty, timestamp = row
            try:
                grammar_feedback = json.loads(grammar_feedback_json)
            except (json.JSONDecodeError, TypeError):
                grammar_feedback = []
            scores = score_session(transcript, grammar_feedback, tone)

            history.append({
                "transcript": transcript,
                "tone": tone,
                "difficulty": difficulty,
                "timestamp": timestamp,
                "scores": scores,
                "xp": scores["xp"]
            })

        return history