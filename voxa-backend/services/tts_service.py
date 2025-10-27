import edge_tts
import asyncio
import uuid
import os

OUTPUT_DIR = "static/responses"
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def generate_tts(text: str, voice: str = "en-US-JennyNeural"):
    filename = f"{uuid.uuid4()}.mp3"
    filepath = os.path.join(OUTPUT_DIR, filename)

    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(filepath)

    return f"/static/responses/{filename}"