import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../api/api";

function CreateDecision() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        problem: "",
        priority: "Medium",
        status: "Pending"
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post("/decisions/", formData);

            toast.success("Decision created successfully!");

            navigate("/");

        } catch (error) {

            console.error(error);

            toast.error("Failed to create decision.");

        } finally {

            setLoading(false);

        }

    }

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="form-header">
                    <h1>Create New Decision</h1>
                    <p>
                        Capture your next strategic decision.
                    </p>
                </div>

                <form
                    className="decision-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">
                        <label>Decision Title</label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">

                        <label>Problem Statement</label>

                        <textarea
                            rows="5"
                            name="problem"
                            value={formData.problem}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Priority</label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>

                        </div>

                        <div className="form-group">

                            <label>Status</label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option>Pending</option>
                                <option>Completed</option>
                            </select>

                        </div>

                    </div>

                    <div className="form-buttons">

                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={() => navigate("/")}
                        >
                            <ArrowLeft size={18} />
                            Back
                        </button>

                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >
                            <Save size={18} />
                            {loading ? " Creating..." : " Create Decision"}
                        </button>

                    </div>

                </form>

            </div>

        </>
    );
}

export default CreateDecision;