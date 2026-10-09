import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Sessions() {

    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [filter, setFilter] = useState("ALL");


    // =========================
    // LOAD SESSION REPORT
    // =========================

    useEffect(() => {
        loadSessions();
    }, []);


    const loadSessions = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/reports/sessions"
            );

            setSessions(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load sessions. Make sure the Spring Boot backend is running."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // FORMAT DATE
    // =========================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const formattedDate = new Date(date);

        return formattedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    };


    // =========================
    // FORMAT TIME
    // =========================

    const formatTime = (time) => {

        if (!time) {
            return "-";
        }

        return time.substring(0, 5);
    };


    // =========================
    // FILTER SESSIONS
    // =========================

    const filteredSessions =
        filter === "ALL"
            ? sessions
            : sessions.filter(
                session =>
                    session.status === filter
            );


    // =========================
    // STATISTICS
    // =========================

    const totalSessions = sessions.length;

    const bookedSessions = sessions.filter(
        session =>
            session.status === "BOOKED"
    ).length;

    const completedSessions = sessions.filter(
        session =>
            session.status === "COMPLETED"
    ).length;

    const cancelledSessions = sessions.filter(
        session =>
            session.status === "CANCELLED"
    ).length;


    // =========================
    // DELETE SESSION
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this session?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(
                `/sessions/${id}`
            );

            setSuccess(
                "Session deleted successfully."
            );

            await loadSessions();

        } catch (err) {

            console.error(err);

            if (err.response?.data?.message) {

                setError(
                    err.response.data.message
                );

            } else {

                setError(
                    "Unable to delete session."
                );

            }

        }
    };


    return (

        <div className="sessions-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-heading">

                <div>

                    <h2>Sessions</h2>

                    <p>
                        Manage and monitor photography sessions.
                    </p>

                </div>


                <button
                    className="primary-btn"
                    onClick={() =>
                        navigate("/book-session")
                    }
                >
                    + Book Session
                </button>

            </div>


            {/* =========================
                MESSAGES
            ========================= */}

            {loading && (
                <div className="loading-message">
                    Loading sessions...
                </div>
            )}


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            {success && (
                <div className="success-message">
                    {success}
                </div>
            )}


            {/* =========================
                STATISTICS
            ========================= */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon">
                        📅
                    </div>

                    <div>

                        <span>
                            Total Sessions
                        </span>

                        <h3>
                            {totalSessions}
                        </h3>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        🟡
                    </div>

                    <div>

                        <span>
                            Booked
                        </span>

                        <h3>
                            {bookedSessions}
                        </h3>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        🟢
                    </div>

                    <div>

                        <span>
                            Completed
                        </span>

                        <h3>
                            {completedSessions}
                        </h3>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        🔴
                    </div>

                    <div>

                        <span>
                            Cancelled
                        </span>

                        <h3>
                            {cancelledSessions}
                        </h3>

                    </div>

                </div>

            </div>


            {/* =========================
                FILTERS
            ========================= */}

            <div className="session-filters">

                <button
                    className={
                        filter === "ALL"
                            ? "filter-btn active"
                            : "filter-btn"
                    }
                    onClick={() =>
                        setFilter("ALL")
                    }
                >
                    All
                </button>


                <button
                    className={
                        filter === "BOOKED"
                            ? "filter-btn active"
                            : "filter-btn"
                    }
                    onClick={() =>
                        setFilter("BOOKED")
                    }
                >
                    Booked
                </button>


                <button
                    className={
                        filter === "COMPLETED"
                            ? "filter-btn active"
                            : "filter-btn"
                    }
                    onClick={() =>
                        setFilter("COMPLETED")
                    }
                >
                    Completed
                </button>


                <button
                    className={
                        filter === "CANCELLED"
                            ? "filter-btn active"
                            : "filter-btn"
                    }
                    onClick={() =>
                        setFilter("CANCELLED")
                    }
                >
                    Cancelled
                </button>

            </div>


            {/* =========================
                SESSION TABLE
            ========================= */}

            {!loading && !error && (

                <div className="table-card">

                    <div className="table-header">

                        <div>

                            <h3>
                                Session List
                            </h3>

                            <p>
                                Sessions with customer,
                                photographer and service details.
                            </p>

                        </div>


                        <span className="table-count">
                            {filteredSessions.length} Sessions
                        </span>

                    </div>


                    <div className="table-container">

                        <table className="data-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Customer</th>

                                    <th>Photographer</th>

                                    <th>Service</th>

                                    <th>Date</th>

                                    <th>Time</th>

                                    <th>Status</th>

                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredSessions.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="empty-message"
                                        >
                                            No sessions found.
                                        </td>

                                    </tr>

                                ) : (

                                    filteredSessions.map(
                                        (session) => (

                                            <tr
                                                key={
                                                    session.session_id
                                                }
                                            >

                                                <td>
                                                    #
                                                    {
                                                        session.session_id
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        session.customer_name
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        session.photographer_name
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        session.service_name
                                                    }
                                                </td>


                                                <td>
                                                    {formatDate(
                                                        session.session_date
                                                    )}
                                                </td>


                                                <td>
                                                    {formatTime(
                                                        session.start_time
                                                    )}
                                                    {" - "}
                                                    {formatTime(
                                                        session.end_time
                                                    )}
                                                </td>


                                                <td>

                                                    <span
                                                        className={`status-badge ${session.status?.toLowerCase()}`}
                                                    >
                                                        {
                                                            session.status
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() =>
                                                            handleDelete(
                                                                session.session_id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Sessions;