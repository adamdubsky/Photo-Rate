import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()  # Loads the .env file

# Environment variables
ENVIRONMENT = os.getenv("ENVIRONMENT", "local")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Ensure the upload directory exists
Path(UPLOAD_DIR).mkdir(exist_ok=True)
