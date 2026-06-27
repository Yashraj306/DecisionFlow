import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import Navbar from "../components/Navbar";
import api from "../api/api";

function EditDecision() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        problem: "",
        priority: "Medium",
        status: "Pending"
    });

    useEffect(() => {
        loadDecision();
    }, []);

    async function loadDecision() {

        try {

            const response = await api.get(`/decisions/${id}`);

            setFormData({
                title: response.data.title,
                problem: response.data.problem,
                priority: response.data.priority,
                status: response.data.status
            });

        } catch (error) {

            console.error(error);

        }

    }

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

            await api.put(
                `/decisions/${id}`,
                formData
            );

            navigate("/");

        } catch (error) {

            console.error(error);

            alert("Unable to update decision.");

        } finally {

            setLoading(false);

        }

    }

    return (
        <>
            <Navbar />

            <div className="container">

                <div className="form-header">

                    <h1>Edit Decision</h1>

                    <p>
                        Update your strategic decision details.
                    </p>

                </div>

                <form
                    className="decision-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>Decision Title</label>

                        <input
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
                            {loading
                                ? " Updating..."
                                : " Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </>
    );

}

export default EditDecision;