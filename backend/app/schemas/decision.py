from pydantic import BaseModel

from datetime import datetime


class DecisionCreate(BaseModel):
    title: str
    problem: str
    priority: str
    

class DecisionUpdate(BaseModel):
    title: str
    problem: str
    priority: str
    status: str

class DecisionResponse(BaseModel):
    id: int
    title: str
    problem: str
    status: str
    priority: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }