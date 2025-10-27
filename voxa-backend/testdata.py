import requests

response = requests.post("http://localhost:8000/respond_to_user", json={
    "user_id": "test_user_001",
    "transcript": "Hello, I’d like to order coffee.",
    "scenario_id": "cafe_ordering",
    "conversation_history": [],
    "voice": "en-US-JennyNeural"
})

print(response.json())