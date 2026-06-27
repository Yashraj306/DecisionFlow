from fastapi import FastAPI
from app.api.decision import router as decision_router
from app.database.database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="DecisionFlow API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)
app.include_router(decision_router)

@app.get("/")
def home():
    return {
        "message": "DecisionFlow Backend Running 🚀"
    }