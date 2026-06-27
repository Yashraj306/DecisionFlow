import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    PlusCircle,
    Rocket
} from "lucide-react";

function Navbar() {

    const location = useLocation();

    return (
        <header className="navbar">

            <div className="navbar-container">

                <div className="logo">

                    <div className="logo-icon">
                        <Rocket size={22} />
                    </div>

                    <div className="logo-text">
                        <h2>FounderOS</h2>
                        <p>Decision Management Dashboard</p>
                    </div>

                </div>

                <nav className="nav-links">

                    <Link
                        to="/"
                        className={
                            location.pathname === "/"
                                ? "active"
                                : ""
                        }
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Link>

                    <Link
                        to="/create"
                        className="new-decision-btn"
                    >
                        <PlusCircle size={18} />
                        New Decision
                    </Link>

                </nav>

            </div>

        </header>
    );
}

export default Navbar;