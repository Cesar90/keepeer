from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy import (
    Column,
    DateTime
)

Base = declarative_base()

class TimeStampedModel(Base):
    """
    TimeStampedModel is an abstract base class that adds created and updated timestamp columns
    to models that inherit from it.
    """
    __abstract__ = True

    created = Column(DateTime, default=func.now(), nullable=False)
    updated = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)