from fastapi import APIRouter, HTTPException
import aiosqlite
import bcrypt

DB_PATH = "data/user_sessions.db"
router = APIRouter()

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

@router.post("/signup")
async def signup(username: str, password: str):
    hashed = hash_password(password)
    async with aiosqlite.connect(DB_PATH) as db:
        try:
            await db.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", (username, hashed))
            await db.commit()
            return {"message": "User created"}
        except aiosqlite.IntegrityError:
            raise HTTPException(status_code=400, detail="Username already exists")

@router.post("/login")
async def login(username: str, password: str):
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT password_hash FROM users WHERE username = ?", (username,))
        row = await cursor.fetchone()
        if row and verify_password(password, row[0]):
            return {"message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")