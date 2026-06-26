from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.database import Base


class Decision(Base):
    __tablename__ = "decisions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    problem = Column(String(1000), nullable=False)
    status = Column(String(30), default="Pending")
    priority = Column(String(20), default="Medium")
    created_at = Column(DateTime, default=datetime.utcnow)