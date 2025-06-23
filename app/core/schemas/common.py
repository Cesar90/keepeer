from collections.abc import Sequence
from typing import Generic, TypeVar, Optional
from pydantic import BaseModel, ConfigDict
from pydantic.generics import GenericModel

T = TypeVar("T")

class PaginatedResponse(BaseModel, Generic[T]):
    count: int
    # page_size: int
    # page_number: int
    # num_pages: int
    results: Sequence[T]
    next: Optional[str]= None
    previous: Optional[str]= None

    model_config = ConfigDict(from_attributes=True)