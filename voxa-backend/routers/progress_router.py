from fastapi import APIRouter
from services import progress_service

router = APIRouter()

@router.get("/user_progress/{user_id}")
async def get_user_progress(user_id: str):
    # Optional: filter by user_id if you store it in sessions
    history = await progress_service.get_history(user_id)
    return history