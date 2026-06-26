from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.decision import (
    DecisionCreate,
    DecisionResponse,
    DecisionUpdate,
)

from app.services.decision_service import (
    create_decision,
    get_all_decisions,
    get_decision_by_id,
    update_decision,
    delete_decision,
)

router = APIRouter(
    prefix="/decisions",
    tags=["Decisions"]
)


@router.post("/", response_model=DecisionResponse)
def create_new_decision(
    decision: DecisionCreate,
    db: Session = Depends(get_db)
):
    return create_decision(db, decision)


@router.get("/", response_model=List[DecisionResponse])
def get_decisions(db: Session = Depends(get_db)):
    return get_all_decisions(db)


@router.get("/{decision_id}", response_model=DecisionResponse)
def get_decision(
    decision_id: int,
    db: Session = Depends(get_db)
):
    decision = get_decision_by_id(db, decision_id)

    if decision is None:
        raise HTTPException(
            status_code=404,
            detail="Decision not found"
        )

    return decision

@router.put("/{decision_id}", response_model=DecisionResponse)
def edit_decision(
    decision_id: int,
    updated_data: DecisionUpdate,
    db: Session = Depends(get_db)
):
    decision = update_decision(
        db,
        decision_id,
        updated_data
    )

    if decision is None:
        raise HTTPException(
            status_code=404,
            detail="Decision not found"
        )

    return decision

@router.delete("/{decision_id}")
def remove_decision(
    decision_id: int,
    db: Session = Depends(get_db)
):
    decision = delete_decision(db, decision_id)

    if decision is None:
        raise HTTPException(
            status_code=404,
            detail="Decision not found"
        )

    return {
        "message": "Decision deleted successfully"
    }