from typing import Callable
from fastapi import APIRouter, Request, Response
from fastapi.routing import APIRoute
from fastapi.templating import Jinja2Templates

class CheckNameRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()
        async def custom_route_handler(request: Request) -> Response:
            # print(request.scope['route'].name)
            route = request.scope.get("route")
            if route and hasattr(route, "name"):
                request.state.url_name = route.name
                print("[Middleware] Route name:", route.name)
            else:
                request.state.url_name = None
                print("[Middleware] Route name not found")
            response = await original_route_handler(request)
            return response

        return custom_route_handler
    
class CustomTemplates(Jinja2Templates):
    def TemplateResponse(self, name: str, context: dict, **kwargs):
        request: Request = context.get("request")
        if request:
            url_name = getattr(request.state, "url_name", None)
            context["url_name"] = url_name
        return super().TemplateResponse(name, context, **kwargs)