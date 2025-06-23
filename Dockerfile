FROM python:3.12

WORKDIR /code


COPY ./requirements.txt /code/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt


COPY ./app /code/app
COPY ./docker /code/docker

RUN chmod +x /code/docker/*.sh
# CMD ["fastapi", "run", "app/main.py", "--port", "80", "--reload"]
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]