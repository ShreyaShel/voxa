from database import engine
from models.progress_model import Base

Base.metadata.create_all(bind=engine)
print("Database reset and tables created.")