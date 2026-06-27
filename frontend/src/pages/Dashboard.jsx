import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
    ClipboardList,
    Clock3,
    CheckCircle,
    Flame
} from "lucide-react";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import SearchBar from "../components/SearchBar";
import DecisionCard from "../components/DecisionCard";
import EmptyState from "../components/EmptyState";

import api from "../api/api";

function Dashboard() {

    const [decisions, setDecisions] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchDecisions();
    }, []);

    async function fetchDecisions() {
        try {
            const response = await api.get("/decisions/");
            setDecisions(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const filtered = useMemo(() => {

        return decisions.filter((decision) =>
            decision.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    }, [decisions, search]);

    const total = decisions.length;

    const pending = decisions.filter(
        (d) => d.status === "Pending"
    ).length;

    const completed = decisions.filter(
        (d) => d.status === "Completed"
    ).length;

    const highPriority = decisions.filter(
        (d) => d.priority === "High"
    ).length;

    return (
        <>
            <Navbar />

            <div className="dashboard">

        <section className="hero">

    <div className="hero-content">

        <div>

            <h1>
                🚀 DecisionFlow
            </h1>

            <p>

                AI-Powered Decision Intelligence Dashboard

                <br /><br />

                Track • Analyze • Prioritize • Execute

                <br /><br />

                Make smarter business decisions using
                Impact, Effort and Risk analysis.

            </p>

        </div>

        <Link
            to="/create"
            className="hero-btn"
        >

            + New Decision

        </Link>

    </div>

</section>

                <section className="stats">

                    <StatCard
                        title="Total Decisions"
                        value={total}
                        color="#2563eb"
                        icon={<ClipboardList size={28} />}
                    />

                    <StatCard
                        title="Pending"
                        value={pending}
                        color="#f59e0b"
                        icon={<Clock3 size={28} />}
                    />

                    <StatCard
                        title="Completed"
                        value={completed}
                        color="#22c55e"
                        icon={<CheckCircle size={28} />}
                    />

                    <StatCard
                        title="High Priority"
                        value={highPriority}
                        color="#ef4444"
                        icon={<Flame size={28} />}
                    />

                </section>

                <section className="search-container">

                    <SearchBar
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </section>

                {
                    filtered.length === 0 ?

                        <EmptyState />

                        :

                        <section className="cards">

                            {
                                filtered.map((decision) => (

                                    <DecisionCard
                                        key={decision.id}
                                        decision={decision}
                                        onDelete={fetchDecisions}
                                    />

                                ))
                            }

                        </section>

                }

            </div>

        </>
    );

}

export default Dashboard;