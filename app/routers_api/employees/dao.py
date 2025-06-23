from app.core.dao.base import BaseDAO
from app.routers_api.employees.models import Employees

class EmployeesDAO(BaseDAO):
    model = Employees