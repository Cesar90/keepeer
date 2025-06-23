from fastapi import HTTPException, status

class BaseException(HTTPException):
    status_code = 500
    detail = ""
    
    def __init__(self):
        super().__init__(status_code=self.status_code, detail=self.detail)

UserAlreadyExistsException = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail="The user already exist"
)

IncorrectEmailOrPasswordExeception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect Email or Password"
)

TokenExpiredException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Token Expired"
)

TokenAbsentException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Token Absent in json token"
)

IncorrectTokenFormatException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect Token Format"
)

UserIsNotPresentException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect Token Format"
)

RoomCannotBeBooked = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail="Room cannot be booked"
)

class EmployeeCannotBeCreated(BaseException):
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
    detail="There was a problem to create new employee"

class RoomFullyBooked(BaseException):
    status_code=status.HTTP_409_CONFLICT
    detail="Room fully be booked"

class HotelNotFoundException(HTTPException):
    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Hotel not found.',
        )

class TokenAbsentExceptionCls(HTTPException):
    def __init__(self):
        super().__init__(status_code=401, detail="Token is absent")

class TokenExpiredExceptionCls(HTTPException):
    def __init__(self):
        super().__init__(status_code=401, detail="Token has expired")

class IncorrectTokenFormatExceptionCls(HTTPException):
    def __init__(self):
        super().__init__(status_code=401, detail="Incorrect token format")

class UserIsNotPresentExceptionCls(HTTPException):
    def __init__(self):
        super().__init__(status_code=401, detail="User is not present in the system")