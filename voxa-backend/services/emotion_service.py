# services/emotion_service.py

from transformers import pipeline
import re

# Load sentiment classifier
classifier = pipeline("sentiment-analysis")

def analyze_emotion(text: str):
    # Sentiment → Tone
    result = classifier(text)[0]
    label = result["label"].lower()
    tone = "confident" if label == "positive" else "nervous"

    # Empathy: based on emotional/relational keywords
    empathy_keywords = ["sorry", "understand", "feel", "appreciate", "thank", "hope"]
    empathy_score = sum(word in text.lower() for word in empathy_keywords)
    empathy = round(min(1.0, 0.4 + 0.1 * empathy_score), 2)

    # Pacing: based on average sentence length
    sentence_count = text.count(".") + text.count("?") + text.count("!")
    word_count = len(text.split())
    avg_sentence_length = word_count / max(1, sentence_count)
    pacing = (
        "fast" if avg_sentence_length > 20 else
        "slow" if avg_sentence_length < 8 else
        "moderate"
    )

    # Clarity: based on filler words
    filler_words = ["um", "uh", "like", "you know", "so", "actually"]
    clean_text = re.sub(r"[^\w\s]", "", text.lower())
    filler_count = sum(clean_text.count(f) for f in filler_words)
    clarity = (
        "high" if filler_count == 0 else
        "medium" if filler_count <= 2 else
        "low"
    )

    # Debug log (optional)
    print("Emotion analysis:", {
        "tone": tone,
        "empathy": empathy,
        "pacing": pacing,
        "clarity": clarity
    })

    return {
        "tone": tone,
        "empathy": empathy,
        "pacing": pacing,
        "clarity": clarity
    }