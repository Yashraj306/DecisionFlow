import { Link } from "react-router-dom";
import {
    Eye,
    Pencil,
    Trash2,
    CalendarDays,
    Flag,
    CheckCircle2,
    Clock3
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../api/api";
import RecommendationBadge from "./RecommendationBadge";

function DecisionCard({ decision, onDelete }) {

    async function handleDelete() {

        const confirmDelete = window.confirm(
            "Delete this decision?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/decisions/${decision.id}`);

            toast.success("Decision deleted successfully");

            if (onDelete) {
                onDelete();
            }

        } catch (error) {

            console.error(error);

            toast.error("Unable to delete decision");

        }

    }

    function priorityClass(priority) {

        switch ((priority || "").toLowerCase()) {

            case "high":
                return "badge badge-high";

            case "low":
                return "badge badge-low";

            default:
                return "badge badge-medium";

        }

    }

    function statusClass(status) {

        switch ((status || "").toLowerCase()) {

            case "completed":
                return "badge badge-completed";

            default:
                return "badge badge-pending";

        }

    }

    return (

        <div className="decision-card">

            <div className="card-header">

                <div>

                    <h3 className="card-title">
                        🚀 {decision.title}
                    </h3>

                </div>

            </div>

            <p className="card-problem">
                {decision.problem}
            </p>

            <div className="card-meta">

                <span className={priorityClass(decision.priority)}>
                    <Flag size={14} />
                    &nbsp;
                    {decision.priority}
                </span>

                <span className={statusClass(decision.status)}>

                    {
                        decision.status === "Completed"

                            ?

                            <CheckCircle2 size={14} />

                            :

                            <Clock3 size={14} />

                    }

                    &nbsp;

                    {decision.status}

                </span>

            </div>

            <div className="recommendation-title">

                💡 AI Recommendation

            </div>

            <RecommendationBadge
                recommendation={decision.recommendation}
            />

            <div className="card-footer">

                <div className="card-date">

                    <CalendarDays size={14} />

                    &nbsp;

                    {new Date(
                        decision.created_at
                    ).toLocaleDateString()}

                </div>

                <div className="card-actions">

                    <Link to={`/decision/${decision.id}`}>

                        <button
                            className="action-btn view-btn"
                        >
                            <Eye size={18} />
                        </button>

                    </Link>

                    <Link to={`/edit/${decision.id}`}>

                        <button
                            className="action-btn edit-btn"
                        >
                            <Pencil size={18} />
                        </button>

                    </Link>

                    <button
                        className="action-btn delete-btn"
                        onClick={handleDelete}
                    >
                        <Trash2 size={18} />
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DecisionCard;