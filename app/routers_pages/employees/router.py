from fastapi import APIRouter, Request
from app.core.utils.web_routers import (
    CheckNameRoute, 
    CustomTemplates
)

router = APIRouter(
    prefix="/employees",
    route_class=CheckNameRoute,
    tags=["Frontend"]
)
templates = CustomTemplates(directory="app/templates")

@router.get('', name="EmployeeListPage")
async def get_employee_list_page(request: Request):
    return templates.TemplateResponse(
        name='employees/list.html',
        context={
            'request': request
        },
    )

@router.get('/create', name="EmployeeCreatePage")
async def get_employee_create_page(request: Request):
    return templates.TemplateResponse(
        name='employees/create.html',
        context={
            'request': request
        },
    )