from pydantic import BaseModel, ConfigDict, model_validator
from typing import Optional
from enum import Enum


# Shared fields for both input and output
class EmployeeBase(BaseModel):
    name: str

# Used when creating a new Employee (request body)
class EmployeeCreate(EmployeeBase):
    # Ensure taxes field is serialized as a string
    pass


# Used when reading an Employee (response model)
class EmployeeRead(EmployeeBase):
    id: int

    model_config = ConfigDict(from_attributes=True)