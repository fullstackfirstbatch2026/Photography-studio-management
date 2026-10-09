import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div className="dashboard">

            {/* Page Header */}
            <div className="page-header">
                <div>
                    <h2>Dashboard</h2>
                    <p>Welcome to Photography Studio Management</p>
                </div>

                <Link to="/book-session" className="primary-btn">
                    + Book Session
                </Link>
            </div>


            {/* Statistics */}
            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon">👥</div>

                    <div>
                        <span>Total Customers</span>
                        <h3>8</h3>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon">📸</div>

                    <div>
                        <span>Photographers</span>
                        <h3>5</h3>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon">🛍️</div>

                    <div>
                        <span>Services</span>
                        <h3>5</h3>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon">📅</div>

                    <div>
                        <span>Total Sessions</span>
                        <h3>13</h3>
                    </div>
                </div>

            </div>


            {/* Dashboard Content */}
            <div className="dashboard-grid">

                {/* Upcoming Sessions */}
                <div className="dashboard-card">

                    <div className="card-header">
                        <div>
                            <h3>Upcoming Sessions</h3>
                            <p>Recently scheduled photography sessions</p>
                        </div>

                        <Link to="/sessions">
                            View All
                        </Link>
                    </div>


                    <div className="session-list">

                        <div className="session-item">
                            <div className="session-icon">
                                📷
                            </div>

                            <div className="session-info">
                                <strong>Arun Kumar</strong>
                                <span>Wedding Photography</span>
                            </div>

                            <div className="session-date">
                                <strong>Oct 05</strong>
                                <span>09:00 - 13:00</span>
                            </div>
                        </div>


                        <div className="session-item">
                            <div className="session-icon">
                                📷
                            </div>

                            <div className="session-info">
                                <strong>Priya Sharma</strong>
                                <span>Wedding Photography</span>
                            </div>

                            <div className="session-date">
                                <strong>Oct 06</strong>
                                <span>10:00 - 14:00</span>
                            </div>
                        </div>


                        <div className="session-item">
                            <div className="session-icon">
                                📷
                            </div>

                            <div className="session-info">
                                <strong>Karthik Raj</strong>
                                <span>Portrait Photography</span>
                            </div>

                            <div className="session-date">
                                <strong>Oct 07</strong>
                                <span>09:00 - 11:00</span>
                            </div>
                        </div>


                        <div className="session-item">
                            <div className="session-icon">
                                📷
                            </div>

                            <div className="session-info">
                                <strong>Divya Menon</strong>
                                <span>Wedding Photography</span>
                            </div>

                            <div className="session-date">
                                <strong>Oct 08</strong>
                                <span>15:00 - 19:00</span>
                            </div>
                        </div>

                    </div>

                </div>


                {/* Photographer Performance */}
                <div className="dashboard-card">

                    <div className="card-header">
                        <div>
                            <h3>Photographer Performance</h3>
                            <p>Sessions handled</p>
                        </div>

                        <Link to="/reports">
                            Reports
                        </Link>
                    </div>


                    <div className="performance-list">

                        <div className="performance-item">
                            <div className="performance-top">
                                <span>Priya Photography</span>
                                <strong>5 sessions</strong>
                            </div>

                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "100%" }}
                                ></div>
                            </div>
                        </div>


                        <div className="performance-item">
                            <div className="performance-top">
                                <span>Rahul Studios</span>
                                <strong>3 sessions</strong>
                            </div>

                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "60%" }}
                                ></div>
                            </div>
                        </div>


                        <div className="performance-item">
                            <div className="performance-top">
                                <span>Karthik Visuals</span>
                                <strong>2 sessions</strong>
                            </div>

                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "40%" }}
                                ></div>
                            </div>
                        </div>


                        <div className="performance-item">
                            <div className="performance-top">
                                <span>Ananya Clicks</span>
                                <strong>2 sessions</strong>
                            </div>

                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "40%" }}
                                ></div>
                            </div>
                        </div>


                        <div className="performance-item">
                            <div className="performance-top">
                                <span>Vikram Frames</span>
                                <strong>1 session</strong>
                            </div>

                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "20%" }}
                                ></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>


            {/* Quick Actions */}
            <div className="dashboard-card quick-actions-card">

                <div className="card-header">
                    <div>
                        <h3>Quick Actions</h3>
                        <p>Frequently used operations</p>
                    </div>
                </div>


                <div className="quick-actions">

                    <Link to="/customers" className="quick-action">
                        <span>👥</span>
                        <div>
                            <strong>Manage Customers</strong>
                            <small>Add or update customers</small>
                        </div>
                    </Link>


                    <Link to="/photographers" className="quick-action">
                        <span>📸</span>
                        <div>
                            <strong>Manage Photographers</strong>
                            <small>View studio photographers</small>
                        </div>
                    </Link>


                    <Link to="/services" className="quick-action">
                        <span>🛍️</span>
                        <div>
                            <strong>Manage Services</strong>
                            <small>View photography services</small>
                        </div>
                    </Link>


                    <Link to="/reports" className="quick-action">
                        <span>📊</span>
                        <div>
                            <strong>View Reports</strong>
                            <small>Analyze studio performance</small>
                        </div>
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;