from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


#uvicorn main:app --reload
app = FastAPI()

# Allow frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"message": "Hello from FastAPI!"}

