# Keepeer

Keepeer is a modern, full-stack, containerized web application designed with scalability, performance, and developer productivity in mind. It uses **FastAPI** for the backend API, **React** with **TypeScript** for the frontend, and is containerized using **Docker** for consistent local development and deployment.

---

## 📌 Table of Contents

- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [DevOps & Tooling](#devops--tooling)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Application](#running-the-application)
    - [With Docker Compose](#with-docker-compose)
    - [Without Docker (Manual Setup)](#without-docker-manual-setup)
- [Environment Configuration](#-environment-configuration)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Development Philosophy](#-development-philosophy)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🗂 Project Structure

<pre>
my-app/
├── requirements.txt        # Python dependencies
├── .gitignore              # Git ignore rules
├── .dockerignore           # Docker ignore rules
├── Dockerfile              # Backend Dockerfile
├── docker-compose.yml      # Docker Compose configuration
└── app/
    ├── package.json        # Frontend dependencies and scripts
    ├── tsconfig.json       # TypeScript configuration
    ├── components/         # React components (TypeScript)
    ├── main.py             # FastAPI application entrypoint
    ├── static/             # Static assets (served by FastAPI)
    ├── templates/          # Jinja2 templates for server-rendered pages
    ├── routers/            # FastAPI routers
    ├── models/             # Pydantic & ORM models
    └── utils/              # Utility and helper functions
</pre>

## Tech Stack

### 🐍 Backend

- **FastAPI** – High-performance Python web framework for building APIs.
- **Pydantic** – Data validation and settings management using Python type annotations.
- **Uvicorn** – Lightning-fast ASGI server for running FastAPI apps.
- **Jinja2** – Template rendering engine for SSR and dynamic HTML.
- **SQLAlchemy** – (Optional) ORM for database interactions.

### ⚛️ Frontend

- **React** – JavaScript library for building user interfaces.
- **TypeScript** – Superset of JavaScript adding static typing.
- **Webpack** – Build tool and dev server.
- **Axios / Fetch** – For API communication.

### 🐳 DevOps & Tooling

- **Docker** – Containerization for consistent environments.
- **Docker Compose** – Multi-container orchestration.
- **Prettier / ESLint** – Linting and formatting.

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure the following tools are installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js & npm](https://nodejs.org/) (for frontend development outside Docker)
- [Python 3.12+](https://www.python.org/) (for backend development outside Docker)

---

### ▶️ Running the Application

#### With Docker Compose

Run the full stack (FastAPI backend + React frontend) using Docker Compose:

```bash
cd my-app
docker-compose up --build