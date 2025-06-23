# from secrets import token_bytes
# from base64 import b64encode
from datetime import date, datetime, timedelta, timezone
from passlib.context import CryptContext
from datetime import datetime, timedelta
from pydantic import EmailStr
from jose import jwt
from app.config import settings
from app.routers_api.users.dao import UsersDAO

# pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")
pwd_context = CryptContext(
    schemes=["django_pbkdf2_sha256"],
    deprecated="auto"
)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password, hash_password) -> bool:
    return pwd_context.verify(plain_password, hash_password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    # expire = datetime.utcnow() + timedelta(minutes=30)
    # expire = int((datetime.now(timezone.utc) + timedelta(minutes=30)).timestamp())
    # expire = int((datetime.now(timezone.utc) + timedelta(days=7)).timestamp())
    expire = int((datetime.now(timezone.utc) + timedelta(hours=2)).timestamp())
    # expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    # expire = datetime.utcnow()
    # Generate token bytes
    # print(b64encode(token_bytes(32)).decode())
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, settings.ALGORITHM
    )
    return encoded_jwt

async def authenticate_user(email: EmailStr, password: str):
    user = await UsersDAO.find_one_or_none(email=email)
    if user is None:
        return None
    if not verify_password(password, user.password):
        return None
    return user