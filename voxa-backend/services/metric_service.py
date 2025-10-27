# services/metric_service.py

def estimate_metrics(transcript: str):
    word_count = len(transcript.split())
    sentence_count = transcript.count(".") + transcript.count("?") + transcript.count("!")
    avg_sentence_length = word_count / max(1, sentence_count)

    # Fluency score: longer, well-structured sentences = higher fluency
    fluency_score = min(100, int(avg_sentence_length * 5))

    # XP: based on word count (can be scaled later)
    xp = min(100, word_count)

    return {
        "fluency_score": fluency_score,
        "xp": xp
    }