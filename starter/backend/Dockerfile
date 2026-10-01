FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install pipenv
RUN pip install --no-cache-dir pipenv

# Copy Pipfile and install dependencies
COPY Pipfile* ./
RUN pipenv install --system --deploy

# Copy application source
COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
