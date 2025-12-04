# Dockerfile for the backend application

# Use a Python 3.11 base image, as it's compatible with SQLAlchemy 2.0.x
FROM python:3.11-slim-bullseye

# Set the working directory in the container
WORKDIR /app/backend

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application code
COPY app/ app/

# Expose the port the FastAPI application runs on
EXPOSE 8000

# Command to run the application using uvicorn
# The --host 0.0.0.0 makes the server accessible from outside the container
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
