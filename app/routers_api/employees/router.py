from pydantic import TypeAdapter
from fastapi import (
    Depends, 
    APIRouter,
    Request
)
from app.exceptions import EmployeeCannotBeCreated
from app.routers_api.employees.schemas import (
    EmployeeRead, 
    EmployeeCreate
)
from app.routers_api.employees.dao import EmployeesDAO
from app.core.utils.api_paginator import Paginator
from app.routers_api.users.models import Users
from app.routers_api.employees.models import Employees
from app.core import schema

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

@router.post("")
async def create_employee(
    employee: EmployeeCreate
):
    employee = await EmployeesDAO.add(**employee.model_dump())

    if not employee:
        raise EmployeeCannotBeCreated
    
    employee = await EmployeesDAO.find_by_id(employee['id'])
    employee_dict = TypeAdapter(EmployeeRead).validate_python(employee)
    return employee_dict

@router.get("")
async def get_employees(
    request: Request,
    params: schema.CommonQueryParams = Depends()
) -> schema.PaginatedResponse[EmployeeRead]:
    page=params.page
    page_size=params.page_size
    total_employees = await EmployeesDAO.get_total()
    employees = await EmployeesDAO.calculate_offset(page_size, page)
    total_pages = EmployeesDAO.calculate_total_pages(total_employees, page_size)
    items = [EmployeeRead.model_validate(employee) for employee in employees]
    paginator = Paginator(
        total_items=total_employees,
        page=page,
        page_size=page_size,
        results=items,
        request=request
    )

    return schema.PaginatedResponse[EmployeeRead](**paginator.to_response())
    