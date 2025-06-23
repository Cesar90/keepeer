import enum
from sqlalchemy import (
    Column,
    String, 
    BigInteger,
    Integer,
    Enum,
    Index,
    UniqueConstraint,
    CheckConstraint,
)
from sqlalchemy.ext.declarative import declarative_base
from app.core.models.TimeStamped import TimeStampedModel

Base = declarative_base()

class TaxesEnum(str, enum.Enum):
    W9 = "W9",
    W2 = "W2"

class BaseEmployee(TimeStampedModel):
    __abstract__ = True

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(140), index=True, nullable=False)
    secondname = Column(String(140), index=True, nullable=True, default="")
    lastname = Column(String(140), index=True, nullable=False, default="")
    secondlastname = Column(String(140), index=True, nullable=True, default="")
    paycornumber = Column(BigInteger, unique=True, nullable=False)
    # taxes = Column(Enum(TaxesEnum), nullable=False)
    # Use a String column for 'taxes' and enforce possible values using a CheckConstraint
    taxes = Column(String(3), nullable=False)
    __table_args__ = (
        CheckConstraint(taxes.in_(['W2', 'W9']), name='check_taxes_value'),
    )

class Employees(BaseEmployee):
    __tablename__ = "employees_employee"

    __table_args__ = (
        UniqueConstraint('paycornumber', name='unique_employee_record'),
        Index('idx_paycornumber', 'paycornumber'),
    )

    def __repr__(self):
        return f"{self.name} {self.lastname} {self.secondlastname}"