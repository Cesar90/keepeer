from fastapi import APIRouter, Request
from app.core.utils.web_routers import (
    CheckNameRoute, 
    CustomTemplates
)

router = APIRouter(
    route_class=CheckNameRoute,
    tags=["Frontend"]
)
templates = CustomTemplates(directory="app/templates")

@router.get('/login', name="LoginPage")
async def get_login_page(request: Request):
    return templates.TemplateResponse(
        name='login.html',
        context={
            'request': request
        },
    )

@router.get('/', name="HomePage")
async def get_home_page(request: Request):
    return templates.TemplateResponse(
        name='home.html',
        context={
            'request': request
        },
    )