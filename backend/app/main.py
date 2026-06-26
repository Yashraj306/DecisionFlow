from fastapi import FastAPI
from app.api.decision import router as decision_router
from app.database.database import engine, Base

app = FastAPI(
    title="DecisionFlow API",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)
app.include_router(decision_router)

@app.get("/")
def home():
    return {
        "message": "DecisionFlow Backend Running 🚀"
    }