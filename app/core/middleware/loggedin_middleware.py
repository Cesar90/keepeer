import json
from datetime import datetime, timezone
from urllib.parse import quote
from starlette.responses import Response
from jose import jwt, JWTError
from app.config import settings
from app.routers_pages.auth import router
from app.routers_api.users.dao import UsersDAO
from app.core.middleware.base_middleware import BaseMiddleware

class LoggedinMiddleware(BaseMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(self, request, call_next):
        token = request.cookies.get("cerhr_access_token")
        user_data_cookie = request.cookies.get("user_data")
        user_data = None
        user = None
    
        if token:
            user_id = await self.get_user_id(token)
            if user_id and user_data_cookie is None:
                user = await UsersDAO.find_by_id(int(user_id))
                if user:
                    permissions = []  # Implement logic if needed
                    groups = []       # Implement logic if needed
                    user_data = {
                        "permissions": permissions,
                        "groups": groups,
                        "user_id": user.id,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "username": user.username
                    }
                    # user_data = json.loads(unquote(user_data))

        # Prepare response
        response: Response = await call_next(request)
        if user_data:
            response.set_cookie("user_data", quote(json.dumps(user_data)), max_age=86400)
        return response