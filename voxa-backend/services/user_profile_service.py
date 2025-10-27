import json
import os

PROFILE_PATH = "data/user_profile.json"

def init_profile():
    if not os.path.exists(PROFILE_PATH):
        default_profile = {
            "preferred_voice": "en-US-JennyNeural",
            "baseline_tone": "neutral"
        }
        with open(PROFILE_PATH, "w") as f:
            json.dump(default_profile, f)

def get_profile():
    init_profile()
    with open(PROFILE_PATH, "r") as f:
        return json.load(f)

def update_profile(preferred_voice=None, baseline_tone=None):
    init_profile()
    profile = get_profile()

    if preferred_voice:
        profile["preferred_voice"] = preferred_voice
    if baseline_tone:
        profile["baseline_tone"] = baseline_tone

    with open(PROFILE_PATH, "w") as f:
        json.dump(profile, f)

    return profile