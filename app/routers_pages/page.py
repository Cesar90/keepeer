from fastapi import APIRouter
from app.routers_pages.auth.router import router as router_auth
from app.routers_pages.employees.router import router as router_employee
from app.core.utils.web_routers import (
    CheckNameRoute
)

page_router = APIRouter(
    route_class=CheckNameRoute,
)
page_router.include_router(
    router_auth
)

page_router.include_router(
    router_employee
)