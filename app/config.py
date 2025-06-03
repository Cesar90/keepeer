from typing import Optional, Literal
from pydantic import  model_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MODE: Literal["DEV","TEST","PROD"]
    LOG_LEVEL: str

    DB_HOST : str
    DB_PORT : int
    DB_USER : str
    DB_PASS : str
    DB_NAME : str
    DATABASE_URL: Optional[str] = None  # Make DATABASE_URL optional

    @model_validator(mode='after')
    def get_database_url(cls, v):
        v.DATABASE_URL = f"postgresql+asyncpg://{v.DB_USER}:{v.DB_PASS}@{v.DB_HOST}:{v.DB_PORT}/{v.DB_NAME}"
        return v
    
    TEST_DB_HOST : str
    TEST_DB_PORT : int
    TEST_DB_USER : str
    TEST_DB_PASS : str
    TEST_DB_NAME : str
    TEST_DATABASE_URL: Optional[str] = None  # Make DATABASE_URL optional

    @model_validator(mode='after')
    def get_test_database_url(cls, v):
        v.TEST_DATABASE_URL = f"postgresql+asyncpg://{v.TEST_DB_USER}:{v.TEST_DB_PASS}@{v.TEST_DB_HOST}:{v.TEST_DB_PORT}/{v.TEST_DB_NAME}"
        return v
    
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASS: str

    REDIS_HOST: str
    REDIS_PORT: int

    SENTRY_DSN: str
    
    SECRET_KEY: str
    ALGORITHM: str

    class Config:
        env_file = ".env"

settings = Settings()

print(settings.DATABASE_URL)