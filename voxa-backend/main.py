from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tempfile

from services.whisper_service import transcribe_audio
from services.grammar_service import analyze_grammar
from services.emotion_service import analyze_emotion
from services.tts_service import generate_tts
from services.progress_service import log_session, get_progress, score_session, get_history
from services.feedback_service import generate_feedback
from services.user_profile_service import get_profile, update_profile
from services.auth_service import create_user, authenticate_user, create_token
from database import engine
from models.user import Base as UserBase
from models.session import Session
from models.progress import Progress
from view import response_router
from routers import progress_router
from routers import auth_router



from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory=os.path.join("static")), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class TextInput(BaseModel):
    text: str

class ReplyInput(BaseModel):
    text: str
    voice: str = "en-US-JennyNeural"

class SessionInput(BaseModel):
    transcript: str
    grammar_feedback: list[str]
    tone: str

class FeedbackInput(BaseModel):
    transcript: str
    grammar_feedback: list[str]
    tone: str

class CoachInput(BaseModel):
    transcript: str
    grammar_feedback: list[str]
    tone: str
    voice: str = "en-US-JennyNeural"

class ProfileUpdate(BaseModel):
    preferred_voice: str | None = None
    baseline_tone: str | None = None

class RegisterInput(BaseModel):
    name: str
    email: str
    password: str

class LoginInput(BaseModel):
    email: str
    password: str

# Endpoints
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    transcript = await transcribe_audio(file)
    return {"transcript": transcript}

@app.post("/analyze_grammar")
async def grammar_check(input: TextInput):
    feedback = analyze_grammar(input.text)
    return {"grammar_feedback": feedback}

@app.post("/analyze_emotion")
async def emotion(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name
    result = analyze_emotion(tmp_path)
    return result

@app.post("/generate_reply")
async def generate_reply(input: ReplyInput):
    filename = await generate_tts(input.text, input.voice)
    return {"audio_file": filename}

@app.post("/track_progress")
async def track_progress(input: SessionInput):
    await log_session(input.transcript, str(input.grammar_feedback), input.tone)
    progress = await get_progress()
    return progress

@app.post("/generate_feedback")
async def feedback(input: FeedbackInput):
    scores = score_session(input.transcript, input.grammar_feedback, input.tone)
    message = generate_feedback(input.transcript, input.grammar_feedback, input.tone, scores)
    return {"feedback_message": message}

@app.post("/coach_me")
async def coach(input: CoachInput):
    scores = score_session(input.transcript, input.grammar_feedback, input.tone)
    message = generate_feedback(input.transcript, input.grammar_feedback, input.tone, scores)
    filename = await generate_tts(message, input.voice)
    return {"audio_file": filename, "feedback_message": message}

@app.get("/get_history")
async def history():
    return await get_history()

@app.get("/get_profile")
async def profile():
    return get_profile()

@app.post("/update_profile")
async def update(input: ProfileUpdate):
    return update_profile(input.preferred_voice, input.baseline_tone)

@app.post("/register")
async def register(input: RegisterInput):
    user = create_user(input.name, input.email, input.password)
    if not user:
        return {"error": "Email already registered"}
    token = create_token(user.id)
    return {"token": token, "user": {"name": user.name, "email": user.email}}

@app.post("/login")
async def login(input: LoginInput):
    user = authenticate_user(input.email, input.password)
    if not user:
        return {"error": "Invalid credentials"}
    token = create_token(user.id)
    return {"token": token, "user": {"name": user.name, "email": user.email}}

# Database setup
UserBase.metadata.create_all(bind=engine)
Session.__table__.create(bind=engine, checkfirst=True)
Progress.__table__.create(bind=engine, checkfirst=True)

# Roleplay router
app.include_router(response_router.router)
app.include_router(progress_router.router)
app.include_router(auth_router.router)