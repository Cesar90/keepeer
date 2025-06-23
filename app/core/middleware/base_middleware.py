from starlette.middleware.base import BaseHTTPMiddleware
from jose import jwt, JWTError
from datetime import datetime, timezone
from app.config import settings

class BaseMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def get_user_id(self, token):
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, settings.ALGORITHM
            )
        except JWTError:
            return None
        
        expire: str = payload.get("exp")
        if not expire or int(expire) < int(datetime.now(timezone.utc).timestamp()):
            return None
        
        user_id: str = payload.get("sub")
        if not user_id:
            return None
        
        return user_id