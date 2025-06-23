from starlette.routing import Match
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import RedirectResponse, HTMLResponse, Response
from fastapi import status
from app.routers_pages.auth import router
from jose import jwt, JWTError
from datetime import datetime, timezone
from app.exceptions import (
    TokenExpiredExceptionCls,
)
from app.config import settings
from app.routers_api.users.dao import UsersDAO
from app.routers_api.users.models import Users
from app.core.middleware.base_middleware import BaseMiddleware

class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(self, request, call_next):
        token = request.cookies.get("cerhr_access_token")
        public_routes = ["LoginPage"]
        path = request.url.path
        route_matched = False

        # if token:
        #     validation_response = await self.validate_token(token)
        #     if isinstance(validation_response, RedirectResponse):
        #         return validation_response
        try:
            if token:
                await self.validate_token(token)
        except TokenExpiredExceptionCls:
            response = RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)
            response.delete_cookie("cerhr_access_token")
            return response
        
        for route in request.app.router.routes:
            match, _ = route.matches(request.scope)
            if match == Match.FULL:
                route_matched = True

                if token and getattr(route, "name", None) == 'LoginPage':
                    return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)

                if getattr(route, "name", None) in public_routes:
                    return await call_next(request)
                break
        
        # Bypass static files and public routes
        if path.startswith("/static") or path in ["/favicon.ico"]:
            return await call_next(request)

            # if match == Match.FULL and getattr(route, "name", None) in public_routes:
            #     return await call_next(request)
        if not route_matched:
            template = router.templates.get_template("404.html")
            content = template.render(request=request)
            return HTMLResponse(content=content, status_code=status.HTTP_404_NOT_FOUND)

        if not token:
            return RedirectResponse(url="/login", status_code=status.HTTP_303_SEE_OTHER)
            
        return await call_next(request)
    
    async def validate_token(self, token):
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, settings.ALGORITHM
            )
        except JWTError:
            # return RedirectResponse(url="/login", status_code=status.HTTP_303_SEE_OTHER)
            raise TokenExpiredExceptionCls()
        
        expire: str = payload.get("exp")
        if not expire or int(expire) < int(datetime.now(timezone.utc).timestamp()):
            # return RedirectResponse(url="/login", status_code=status.HTTP_303_SEE_OTHER)
            raise TokenExpiredExceptionCls()
        user_id: str = payload.get("sub")
        if not user_id:
            # return RedirectResponse(url="/login", status_code=status.HTTP_303_SEE_OTHER)
            raise TokenExpiredExceptionCls()