import math
from sqlalchemy import select, insert, func
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy.orm import DeclarativeMeta
from app.database import async_session_maker
from app.core import schema

from app.logger import logger

class BaseDAO:
    model = None

    @classmethod
    async def find_by_id(cls, model_id: int):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(id=model_id)
            result = await session.execute(query)
            return result.scalar_one_or_none()

    @classmethod
    async def find_one_or_none(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            return result.scalar_one_or_none()

    @classmethod
    async def find_all(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filter_by)
            result = await session.execute(query)
            # return result.all() #result could be [(0Xafsd45,)] as a tuple
            return result.scalars().all()
        
    @classmethod
    async def get_total(cls):
        async with async_session_maker() as session:
            query = select(func.count(cls.model.id))
            result = await session.execute(query)
            # return result.scalars().all()
            return result.scalar_one()
        
    @classmethod
    async def calculate_offset(cls, page_size: int, page_number: int):
        offset = page_size * (page_number - 1)
        async with async_session_maker() as session:
            query = select(cls.model).limit(page_size).offset(offset)
            result = await session.execute(query)
            return result.scalars().all()
    
    @classmethod
    def calculate_total_pages(cls, total_records: int, page_size: int):
        return math.ceil(total_records / page_size)

        
    # @classmethod
    # async def find_all(cls, **data):
    #     async with async_session_maker() as session:
    #         query = insert(cls.model).values(**data)
    #         result = await session.execute(query)
    #         return result.scalars().all()

    @classmethod
    async def add(cls, **data):
        query = insert(cls.model).values(**data).returning(cls.model.id)
        async with async_session_maker() as session:
            try:
                result = await session.execute(query)
                await session.commit()
                return result.mappings().first()
            except Exception as e:
                msg = "Database Exc: Cannot insert data into table"
                logger.error(msg, extra={"table": cls.model.__tablename__}, exc_info=True)
                await session.rollback()
                raise e

        # try:
        #     query = insert(self.model).values(**data).returning(self.model.id)
        #     async with async_session_maker() as session:
        #         try:
        #             result = await session.execute(query)
        #             await session.commit()
        #             return result.mappings().first()
        #         except Exception as e:
        #             await session.rollback()
        #             raise e
        # except IntegrityError as e:
        #     # error = schema.Error(messages=[str(e.orig)])
        #     # print(error.model_dump())
        #     print(self.get_exception_detail(e, 'DETAIL:'))
        #     # print(e.orig)
        #     return None
        # except SQLAlchemyError as e:
        #     msg = "Database Exc: Cannot insert data into table"
        #     logger.error(msg, extra={"table": self.model.__tablename__}, exc_info=True)
        #     return None
        # except Exception as e:
        #     msg = "Unknown Exc: Cannot insert data into table"
        #     logger.error(msg, extra={"table": self.model.__tablename__}, exc_info=True)
        #     return None

    

    # @classmethod
    # async def add(cls, **data):
    #     try:
    #         query = insert(cls.model).values(**data).returning(cls.model.id)
    #         async with async_session_maker() as session:
    #             result = await session.execute(query)
    #             await session.commit()
    #             return result.mappings().first()
    #     except (SQLAlchemyError, Exception) as e:
    #         if isinstance(e, SQLAlchemyError):
    #             msg = "Database Exc: Cannot insert data into table"
    #         elif isinstance(e, Exception):
    #             msg = "Unknown Exc: Cannot insert data into table"

    #         logger.error(msg, extra={"table": cls.model.__tablename__}, exc_info=True)
    #         return None

    # @classmethod
    # async def add(self, **data):
    #     async with async_session_maker() as session:
    #         query = insert(self.model).values(**data)
    #         await session.execute(query)
    #         await session.commit()
