
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from config import UPLOAD_DIR  # Import the upload directory from your config

app = FastAPI()

# Allow requests from your frontend (update this when deploying)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    # Create a file path using the UPLOAD_DIR from config
    file_location = Path(UPLOAD_DIR) / file.filename
    with open(file_location, "wb") as f:
        f.write(await file.read())
    return {"message": "File uploaded successfully", "url": f"/{UPLOAD_DIR}/{file.filename}"}


@app.get("/ping")
def ping():
    return {"message": "Hello from FastAPI!"}

