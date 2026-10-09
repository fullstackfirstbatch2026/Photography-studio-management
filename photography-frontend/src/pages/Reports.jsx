import { useEffect, useState } from "react";
import api from "../services/api";

function Reports() {

    const [activeTab, setActiveTab] = useState("sessions");

    const [sessions, setSessions] = useState([]);
    const [photographers, setPhotographers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =========================
    // LOAD REPORTS
    // =========================

    useEffect(() => {
        loadReports();
    }, []);


    const loadReports = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                sessionsResponse,
                photographersResponse
            ] = await Promise.all([
                api.get("/reports/sessions"),
                api.get("/reports/above-average-photographers")
            ]);

            setSessions(sessionsResponse.data);
            setPhotographers(
                photographersResponse.data
            );

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load reports. Make sure the Spring Boot backend is running."
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

        return new Date(date).toLocaleDateString(
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
    // SESSION STATISTICS
    // =========================

    const totalSessions = sessions.length;

    const bookedSessions =
        sessions.filter(
            session =>
                session.status === "BOOKED"
        ).length;

    const completedSessions =
        sessions.filter(
            session =>
                session.status === "COMPLETED"
        ).length;

    const cancelledSessions =
        sessions.filter(
            session =>
                session.status === "CANCELLED"
        ).length;


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="loading-message">
                Loading reports...
            </div>
        );

    }


    return (

        <div className="reports-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-heading">

                <div>

                    <h2>
                        Reports
                    </h2>

                    <p>
                        Analyze sessions and photographer performance.
                    </p>

                </div>

            </div>


            {/* =========================
                ERROR
            ========================= */}

            {error && (

                <div className="error-message">
                    {error}
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
                        ⭐
                    </div>

                    <div>

                        <span>
                            Above Average
                        </span>

                        <h3>
                            {photographers.length}
                        </h3>

                    </div>

                </div>

            </div>


            {/* =========================
                TABS
            ========================= */}

            <div className="report-tabs">

                <button
                    className={
                        activeTab === "sessions"
                            ? "report-tab active"
                            : "report-tab"
                    }
                    onClick={() =>
                        setActiveTab("sessions")
                    }
                >
                    Session Details
                </button>


                <button
                    className={
                        activeTab === "photographers"
                            ? "report-tab active"
                            : "report-tab"
                    }
                    onClick={() =>
                        setActiveTab("photographers")
                    }
                >
                    Above-Average Photographers
                </button>

            </div>


            {/* ==================================================
                SESSION REPORT
            ================================================== */}

            {activeTab === "sessions" && (

                <div className="table-card">

                    <div className="table-header">

                        <div>

                            <h3>
                                Session Details Report
                            </h3>

                            <p>
                                Customer, photographer and service information.
                            </p>

                        </div>

                        <span className="table-count">
                            {sessions.length} Sessions
                        </span>

                    </div>


                    <div className="table-container">

                        <table className="data-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Customer
                                    </th>

                                    <th>
                                        Photographer
                                    </th>

                                    <th>
                                        Service
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Time
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {sessions.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="empty-message"
                                        >
                                            No session data found.
                                        </td>

                                    </tr>

                                ) : (

                                    sessions.map(
                                        session => (

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
                                                    {
                                                        formatDate(
                                                            session.session_date
                                                        )
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        formatTime(
                                                            session.start_time
                                                        )
                                                    }
                                                    {" - "}
                                                    {
                                                        formatTime(
                                                            session.end_time
                                                        )
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={`status-badge ${
                                                            session.status?.toLowerCase()
                                                        }`}
                                                    >
                                                        {
                                                            session.status
                                                        }
                                                    </span>

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


            {/* ==================================================
                ABOVE AVERAGE PHOTOGRAPHERS REPORT
            ================================================== */}

            {activeTab === "photographers" && (

                <div className="table-card">

                    <div className="table-header">

                        <div>

                            <h3>
                                Above-Average Photographers
                            </h3>

                            <p>
                                Photographers handling more sessions than the average.
                            </p>

                        </div>

                        <span className="table-count">
                            {photographers.length} Photographers
                        </span>

                    </div>


                    <div className="table-container">

                        <table className="data-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Photographer
                                    </th>

                                    <th>
                                        Session Count
                                    </th>

                                    <th>
                                        Performance
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {photographers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="empty-message"
                                        >
                                            No photographer is above the average.
                                        </td>

                                    </tr>

                                ) : (

                                    photographers.map(
                                        photographer => (

                                            <tr
                                                key={
                                                    photographer.photographer_id
                                                }
                                            >

                                                <td>
                                                    #
                                                    {
                                                        photographer.photographer_id
                                                    }
                                                </td>

                                                <td>
                                                    <strong>
                                                        {
                                                            photographer.name
                                                        }
                                                    </strong>
                                                </td>

                                                <td>

                                                    <span className="session-count">

                                                        {
                                                            photographer.session_count
                                                        }

                                                        {" sessions"}

                                                    </span>

                                                </td>

                                                <td>

                                                    <span className="performance-badge">

                                                        Above Average

                                                    </span>

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

export default Reports;1