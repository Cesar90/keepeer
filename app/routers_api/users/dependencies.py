from fastapi import Depends, HTTPException, Request, status
from datetime import date, datetime, timedelta, timezone
from app.routers_api.users.models import Users
from jose import jwt, JWTError
from app.exceptions import (
    TokenExpiredException,
    TokenAbsentException,
    IncorrectTokenFormatException,
    UserIsNotPresentException
)
from app.routers_api.users.dao import UsersDAO

from app.config import settings

def get_token(request: Request):
    token = request.cookies.get("booking_access_token")
    if not token:
        # raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        raise TokenAbsentException
    return token

async def get_current_user(token: str = Depends(get_token)):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, settings.ALGORITHM
        )
    except JWTError:
        raise IncorrectTokenFormatException
        # raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    expire: str = payload.get("exp")
    # if (not expire) or (int(expire) < datetime.utcnow().timestamp()):
    if not expire or int(expire) < int(datetime.now(timezone.utc).timestamp()):
        # print("Here")
        # print(expire)
        # print(int(datetime.now(timezone.utc).timestamp()))
        # print(int(expire) < datetime.utcnow().timestamp())
        # raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        raise TokenExpiredException
    user_id: str = payload.get("sub")
    if not user_id:
        # raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        raise UserIsNotPresentException
    # print("Hey hey hey")
    user = await UsersDAO.find_by_id(int(user_id))
    if not user:
        # raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        raise UserIsNotPresentException
    return user

async def get_current_admin_user(current_user: Users = Depends(get_current_user)):
    # if current_user.role != "admin":
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return current_user