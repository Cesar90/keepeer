from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

def add(app: FastAPI):
    origins = [
        "http://localhost:3000"
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
        allow_headers=["Content-Type", "Set-Cookie", "Access-Control-Allow-Headers", 
                    "Access-Control-Allow-Origin",
                    "Authorization"],
    )


# function for enabling CORS on web server
# def add(app: FastAPI):
#     app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"])