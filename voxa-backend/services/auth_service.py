from models.user import User
from database import SessionLocal
from jose import jwt
import bcrypt
import os

SECRET_KEY = "your-secret-key"  # Replace with env var in production
ALGORITHM = "HS256"

def create_user(name, email, password):
    db = SessionLocal()
    if db.query(User).filter(User.email == email).first():
        return None  # Email already exists
    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user = User(name=name, email=email, password_hash=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(email, password):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    if not user or not bcrypt.checkpw(password.encode(), user.password_hash.encode()):
        return None
    return user

def create_token(user_id):
    payload = {"user_id": user_id}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)