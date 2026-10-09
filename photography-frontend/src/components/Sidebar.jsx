import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            {/* Logo */}
            <div className="sidebar-logo">
                <div className="logo-icon">📷</div>

                <div>
                    <h2>PHOTOGRAPHY</h2>
                    <span>STUDIO</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>🏠</span>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/customers"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>👥</span>
                    <span>Customers</span>
                </NavLink>

                <NavLink
                    to="/photographers"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>📸</span>
                    <span>Photographers</span>
                </NavLink>

                <NavLink
                    to="/services"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>🛍️</span>
                    <span>Services</span>
                </NavLink>

                <NavLink
                    to="/sessions"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>📅</span>
                    <span>Sessions</span>
                </NavLink>

                <NavLink
                    to="/book-session"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>➕</span>
                    <span>Book Session</span>
                </NavLink>

                <NavLink
    to="/cost-calculation"
    className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
    }
>
    <span>💰</span>
    <span>Cost Calculation</span>
</NavLink>

                <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    <span>📊</span>
                    <span>Reports</span>
                </NavLink>

            </nav>

            {/* Bottom section */}
            <div className="sidebar-footer">
                <div className="admin-avatar">
                    A
                </div>

                <div>
                    <strong>Admin</strong>
                    <small>Studio Manager</small>
                </div>
            </div>

        </aside>
    );
}

export default Sidebar;