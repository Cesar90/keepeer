from pydantic import BaseModel
from typing import List, Optional
from fastapi import APIRouter, Depends
from starlette.responses import JSONResponse
from app.routers_api.users.router import router as router_users
from app.routers_api.employees.router import router as router_employees

class ErrorMessage(BaseModel):
    msg: str

class ErrorResponse(BaseModel):
    detail: Optional[List[ErrorMessage]]

api_router = APIRouter(
    default_response_class=JSONResponse,
    responses={
        400: {"model": ErrorResponse},
        401: {"model": ErrorResponse},
        403: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)

@api_router.get("/healthcheck", include_in_schema=False)
def healthcheck():
    return {"status": "ok"}

api_router.include_router(
    router_users
)
api_router.include_router(
    router_employees
)