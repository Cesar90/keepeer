from sqlalchemy import Column, Integer, String
from app.database import Base

class Users(Base):
    __tablename__ = "users_user"

    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    username = Column(String(150), unique=True, nullable=False)
    first_name = Column(String(150), nullable=True)
    last_name = Column(String(150), nullable=True)
    email = Column(String(254), unique=False, nullable=True)

    def __str__(self):
        return f"User {self.email}"