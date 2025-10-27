import random
from models.scenario import AIResponse, Feedback

def generate_ai_response(transcript: str, scenario_id: str, history: list) -> AIResponse:
    transcript = transcript.lower()
    progress = 10
    reply = "Thanks for your message. Let’s keep going!"

    if scenario_id == "coffee_shop":
        if "cappuccino" in transcript:
            reply = "Sure! Would you like that hot or iced?"
            progress = 25
        elif "hot" in transcript or "iced" in transcript:
            reply = "Great. Any milk preference?"
            progress = 50
        elif "oat" in transcript or "almond" in transcript:
            reply = "We’re out of oat milk — would almond work?"
            progress = 75
        else:
            reply = "Perfect! That’ll be $4.50. Anything else?"
            progress = 100

    feedback = Feedback(
        tone=random.choice(["confident", "friendly", "neutral"]),
        empathy=round(random.uniform(0.6, 1.0), 2),
        pacing=random.choice(["slow", "moderate", "fast"]),
        clarity=random.choice(["low", "medium", "high"]),
        grammar=random.choice(["perfect", "minor issues", "needs improvement"])
    )

    return AIResponse(reply=reply, feedback=feedback, progress=progress)