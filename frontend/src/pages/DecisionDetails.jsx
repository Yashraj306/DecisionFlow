import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    CalendarDays,
    Flag,
    CheckCircle2,
    Clock3,
    Pencil
} from "lucide-react";

import Navbar from "../components/Navbar";
import api from "../api/api";

function DecisionDetails() {

    const { id } = useParams();

    const [decision, setDecision] = useState(null);

    useEffect(() => {
        loadDecision();
    }, []);

    async function loadDecision() {

        try {

            const response = await api.get(`/decisions/${id}`);

            setDecision(response.data);

        } catch (error) {

            console.error(error);

        }

    }

    if (!decision) {

        return (
            <>
                <Navbar />

                <div className="container">

                    <h2>Loading...</h2>

                </div>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="container">

                <div className="form-header">

                    <h1>{decision.title}</h1>

                    <p>
                        Decision Details
                    </p>

                </div>

                <div className="decision-form">

                    <div className="form-group">

                        <label>Problem Statement</label>

                        <p
                            style={{
                                lineHeight: 1.8,
                                color: "#475569"
                            }}
                        >
                            {decision.problem}
                        </p>

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Priority</label>

                            <p>

                                <Flag
                                    size={16}
                                />

                                {" "}

                                {decision.priority}

                            </p>

                        </div>

                        <div className="form-group">

                            <label>Status</label>

                            <p>

                                {

                                    decision.status === "Completed"

                                        ?

                                        <CheckCircle2
                                            size={16}
                                        />

                                        :

                                        <Clock3
                                            size={16}
                                        />

                                }

                                {" "}

                                {decision.status}

                            </p>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Created On</label>

                        <p>

                            <CalendarDays
                                size={16}
                            />

                            {" "}

                            {

                                new Date(
                                    decision.created_at
                                ).toLocaleString()

                            }

                        </p>

                    </div>

                    <div className="form-buttons">

                        <Link to="/">

                            <button className="secondary-btn">

                                <ArrowLeft size={18} />

                                Back

                            </button>

                        </Link>

                        <Link
                            to={`/edit/${decision.id}`}
                        >

                            <button className="primary-btn">

                                <Pencil size={18} />

                                Edit Decision

                            </button>

                        </Link>

                    </div>

                </div>

            </div>

        </>

    );

}

export default DecisionDetails;