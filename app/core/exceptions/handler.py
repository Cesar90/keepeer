from fastapi import FastAPI, Request, status
from fastapi.responses import HTMLResponse
from app.routers_pages.auth import router
    
def hander_404_html(app: FastAPI):
    @app.exception_handler(404)
    async def not_found(request: Request, exc: Exception):
        # Render a custom HTML page for 404 (Page Not Found)
        template = router.templates.get_template("404.html")
        content = template.render(request=request)
        return HTMLResponse(content=content, status_code=status.HTTP_404_NOT_FOUND)