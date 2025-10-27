from pydantic import BaseModel
from typing import List

class UserTurn(BaseModel):
    transcript: str
    scenario_id: str
    conversation_history: List[str]

class Feedback(BaseModel):
    tone: str
    empathy: float
    pacing: str
    clarity: str
    grammar: str

class AIResponse(BaseModel):
    reply: str
    feedback: Feedback
    progress: int