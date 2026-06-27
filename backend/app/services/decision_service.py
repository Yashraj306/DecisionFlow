from sqlalchemy.orm import Session

from app.models.decision import Decision
from app.schemas.decision import DecisionCreate, DecisionUpdate


def create_decision(db: Session, decision: DecisionCreate):
    db_decision = Decision(
        title=decision.title,
        problem=decision.problem,
        priority=decision.priority
    )

    db.add(db_decision)
    db.commit()
    db.refresh(db_decision)

    return db_decision


def get_all_decisions(db: Session):
    return db.query(Decision).all()


def get_decision_by_id(db: Session, decision_id: int):
    return db.query(Decision).filter(
        Decision.id == decision_id
    ).first()


def update_decision(
    db: Session,
    decision_id: int,
    updated_data: DecisionUpdate,
):
    decision = get_decision_by_id(db, decision_id)

    if decision is None:
        return None

    decision.title = updated_data.title
    decision.problem = updated_data.problem
    decision.priority = updated_data.priority
    decision.status = updated_data.status

    db.commit()
    db.refresh(decision)

    return decision


def delete_decision(db: Session, decision_id: int):
    decision = get_decision_by_id(db, decision_id)

    if decision is None:
        return None

    db.delete(decision)
    db.commit()

    return decision