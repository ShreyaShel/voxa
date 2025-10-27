from fastapi import APIRouter
from pydantic import BaseModel
from services.llm_service import generate_dynamic_reply
from services.feedback_service import generate_feedback
from services.progress_service import score_session, log_session, get_history
from services.grammar_service import analyze_grammar
from services.emotion_service import analyze_emotion
from services.metric_service import estimate_metrics
from services.tts_service import generate_tts

router = APIRouter()

class RespondInput(BaseModel):
    user_id: str
    transcript: str
    scenario_id: str
    conversation_history: list[str]
    voice: str = "en-US-JennyNeural"

@router.post("/respond_to_user")
async def respond_to_user(input: RespondInput):
    emotion_result = analyze_emotion(input.transcript)
    tone = emotion_result.get("tone", "neutral")
    grammar_feedback = analyze_grammar(input.transcript)

    reply = generate_dynamic_reply(
        transcript=input.transcript,
        scenario_id=input.scenario_id,
        history=input.conversation_history
    )

    scores = score_session(input.transcript, grammar_feedback, tone)

    feedback = generate_feedback(
        input.transcript,
        grammar_feedback,
        tone,
        {**scores, **emotion_result}
    )

    await log_session(
        user_id=input.user_id,
        transcript=input.transcript,
        grammar_feedback=grammar_feedback,
        tone=feedback.get("tone", "neutral")
    )

    metrics = estimate_metrics(input.transcript)
    metrics.update({
        "tone": tone,
        "empathy": emotion_result.get("empathy", 0.5),
        "pacing": emotion_result.get("pacing", "moderate"),
        "clarity": emotion_result.get("clarity", "medium"),
        "grammar": (
            "perfect" if not grammar_feedback else
            "minor issues" if len(grammar_feedback) <= 2 else
            "needs improvement"
        ),
        "xp": scores["xp"]
    })

    audio_file = await generate_tts(reply, voice=input.voice)

    return {
        "reply": reply,
        "tone": tone,
        "feedback": feedback,
        "metrics": metrics,
        "audio_file": audio_file
    }

@router.get("/user_progress")
async def get_user_progress():
    return await get_history()