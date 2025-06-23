from fastapi import (
    Depends,
    APIRouter, 
    HTTPException, 
    Response, 
    status
)
from fastapi.responses import JSONResponse
from app.routers_api.users.auth import (
    authenticate_user, 
    create_access_token, 
    get_password_hash,
)
from app.routers_api.users.models import Users
from app.routers_api.users.schemas import SUserAuth
from app.routers_api.users.dao import UsersDAO
from app.exceptions import (
    UserAlreadyExistsException, 
    IncorrectEmailOrPasswordExeception
)
from app.routers_api.users.dependencies import (
    get_current_admin_user, 
    get_current_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth & Users"]
)

@router.post('/register')
async def register_user(user_data: SUserAuth):
    existing_user = await UsersDAO.find_one_or_none(email=user_data.email)
    if existing_user:
        # raise HTTPException(status_code=500)
        raise UserAlreadyExistsException
    hashed_password = get_password_hash(user_data.password)
    await UsersDAO.add(email=user_data.email, hashed_password=hashed_password)

@router.post("/login")
async def login_user(response: Response, user_data: SUserAuth):
    user = await authenticate_user(user_data.email, user_data.password)
    if not user:
        # raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        raise IncorrectEmailOrPasswordExeception
    # access_token = create_access_token({"sub": user.id})
    access_token = create_access_token({"sub": str (user.id)})
    response.set_cookie("cerhr_access_token", access_token, httponly=True)
    return {"access_token": access_token}
    # return {"access_token": "1234"}

@router.post("/logout")
async def logout_user(response: Response):
    response.delete_cookie("cerhr_access_token")
    response.status_code = status.HTTP_200_OK
    response.body = b'{"message": "Successfully logged out"}'
    response.headers["content-type"] = "application/json"
    return response