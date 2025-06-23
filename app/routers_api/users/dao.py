from app.core.dao.base import BaseDAO
from app.routers_api.users.models import Users

class UsersDAO(BaseDAO):
    model = Users