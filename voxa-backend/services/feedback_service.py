# services/feedback_service.py

def generate_feedback(transcript: str, grammar_feedback: list[str], tone: str, scores: dict):
    grammar_score = scores.get("grammar_score", 0)
    tone_score = scores.get("tone_score", 0)
    fluency_score = scores.get("fluency_score", 0)
    empathy = scores.get("empathy", 0.5)
    pacing = scores.get("pacing", "moderate")
    clarity = scores.get("clarity", "medium")

    # Strengths
    strengths = []
    if grammar_score >= 85:
        strengths.append("Your grammar was strong and accurate.")
    if tone_score >= 85:
        strengths.append("You sounded confident and clear.")
    if fluency_score >= 85:
        strengths.append("Your fluency was smooth and well-paced.")
    if empathy >= 0.7:
        strengths.append("You showed empathy and emotional awareness.")
    if pacing == "moderate":
        strengths.append("Your pacing felt natural and easy to follow.")
    if clarity == "high":
        strengths.append("Your speech was clear and easy to understand.")

    # Improvements
    improvements = []
    if grammar_score < 70:
        if grammar_feedback:
            improvements.append("Watch out for grammar slips like: " + ", ".join(grammar_feedback[:3]))
        else:
            improvements.append("Grammar could be improved with clearer sentence structure.")
    if tone_score < 70:
        improvements.append("Try to project more confidence — slow down and emphasize key words.")
    if fluency_score < 70:
        improvements.append("Work on connecting your phrases more fluidly.")
    if empathy < 0.5:
        improvements.append("Try to express more empathy — acknowledge the other person's feelings or goals.")
    if pacing == "fast":
        improvements.append("Slow down a bit to give your listener time to absorb your message.")
    elif pacing == "slow":
        improvements.append("Try to speak a bit more fluidly to maintain engagement.")
    if clarity == "low":
        improvements.append("Avoid filler words like 'um' or 'like' to improve clarity.")

    # Build feedback message
    message = "Here's how you're doing:\n\n"

    if strengths:
        message += "✅ What you're doing well:\n"
        for s in strengths:
            message += f"- {s}\n"

    if improvements:
        message += "\n🛠️ What to improve:\n"
        for i in improvements:
            message += f"- {i}\n"

    message += "\nKeep practicing — you're making real progress!"

    # Return structured feedback
    return {
        "message": message,
        "strengths": strengths,
        "improvements": improvements
    }