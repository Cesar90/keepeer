from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from app.core.exceptions import handler
from app.core.middleware import (
    cors_middleware,
    gzip_middleware,
    auth_middleware,
    loggedin_middleware,
    exception_middleware
)
from app.logger import logger

# API
from app.routers_api.api import api_router
# Pages
from app.routers_pages.page import page_router

app = FastAPI()
cors_middleware.add(app)
gzip_middleware.add(app)

# we create the ASGI for the frontend
frontend = FastAPI(openapi_url="")
gzip_middleware.add(frontend)
frontend.add_middleware(auth_middleware.AuthMiddleware)
frontend.add_middleware(loggedin_middleware.LoggedinMiddleware)
frontend.include_router(page_router)

frontend.mount("/static", StaticFiles(directory="app/static"), "static")
handler.hander_404_html(frontend)

# we create the Web API framework
api = FastAPI(
    title="Keepeer",
    description="Welcome to Keepeer's API documentation! Here you will able to discover all of the ways you can interact with the Keepeer API.",
    root_path="/api",
    docs_url=None,
    openapi_url="/docs/openapi.json",
    redoc_url="/docs",
)
gzip_middleware.add(api)
api.add_middleware(exception_middleware.ExceptionMiddleware)
api.include_router(api_router)

app.mount("/api", app=api)
app.mount("/", app=frontend)