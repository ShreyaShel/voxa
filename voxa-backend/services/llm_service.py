import requests

def generate_dynamic_reply(transcript, scenario_id, history):
    prompt = f"""
You are roleplaying as a {scenario_id.replace('_', ' ')} character. Respond naturally and conversationally.
Conversation so far:
{format_history(history)}
Customer just said: "{transcript}"
Your reply:
"""

    response = requests.post("http://localhost:11434/api/generate", json={
        "model": "llama3",
        "prompt": prompt,
        "stream": False
    })

    return response.json()["response"].strip()

def format_history(history):
    return "\n".join([f"User: {line}" if i % 2 == 0 else f"AI: {line}" for i, line in enumerate(history)])