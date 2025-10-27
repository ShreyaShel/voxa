from sqlalchemy.orm import Session
from models.user import User
from database import SessionLocal
import bcrypt

def create_user(name, email, password):
    db = SessionLocal()
    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user = User(name=name, email=email, password_hash=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(email):
    db = SessionLocal()
    return db.query(User).filter(User.email == email).first()