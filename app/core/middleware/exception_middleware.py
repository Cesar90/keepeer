from fastapi import status
from fastapi.responses import JSONResponse
from pydantic.error_wrappers import ValidationError
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import StreamingResponse
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from app.logger import logger

class ExceptionMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> StreamingResponse:
        try:
            response = await call_next(request)

        except IntegrityError as e:
            message = self.get_exception_detail(e, 'DETAIL:')
            logger.error(message, extra={}, exc_info=True)
            response = JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content={"detail": message}
            )
        except SQLAlchemyError as e:
            message = self.get_exception_detail(e, 'DETAIL:')
            logger.error(message, extra={}, exc_info=True)
            response = JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content={"detail": message}
            )
        except ValidationError as e:
            message = self.get_exception_detail(e, 'DETAIL:')
            logger.error(message, extra={}, exc_info=True)
            response = JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content={"detail": message}
            )
        except ValueError as e:
            message = self.get_exception_detail(e, 'DETAIL:')
            logger.error(message, extra={}, exc_info=True)
            response = JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                content={"detail": [{"msg": "Unknown", "loc": ["Unknown"], "type": "Unknown"}]},
            )
        except Exception as e:
            response = JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={"detail": [{"msg": "Unknown", "loc": ["Unknown"], "type": "Unknown"}]},
            )

        return response
    
    @classmethod
    def get_exception_detail(self, e, filter):
        return next(
            (line for line in str(e.orig).split('\n') if line.strip().startswith(filter)),
            None
        )