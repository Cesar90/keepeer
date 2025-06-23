#!/bin/bash
echo "Starting Uvicorn with enhanced reload for Windows..."
exec uvicorn app.main:app \
    --host 0.0.0.0 \
    --port 8000 \
    --reload \
    --reload-dir /code \
    --reload-include '*.py' \
    --reload-exclude '*/__pycache__/*' \
    --reload-delay 2 \
    --ws-ping-interval 30 \
    --ws-ping-timeout 30