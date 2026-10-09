import { useEffect, useState } from "react";
import api from "../services/api";

function Services() {

    const [services, setServices] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null);

    const [formData, setFormData] = useState({
        serviceName: "",
        pricePerHour: "",
        description: ""
    });


    // =========================
    // LOAD SERVICES
    // =========================

    useEffect(() => {
        loadServices();
    }, []);


    const loadServices = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/services");

            setServices(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load services. Make sure the Spring Boot backend is running."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // =========================
    // OPEN ADD MODAL
    // =========================

    const handleAdd = () => {

        setEditingService(null);

        setFormData({
            serviceName: "",
            pricePerHour: "",
            description: ""
        });

        setError("");
        setSuccess("");

        setShowModal(true);
    };


    // =========================
    // OPEN EDIT MODAL
    // =========================

    const handleEdit = (service) => {

        setEditingService(service);

        setFormData({
            serviceName: service.serviceName,
            pricePerHour: service.pricePerHour,
            description: service.description || ""
        });

        setError("");
        setSuccess("");

        setShowModal(true);
    };


    // =========================
    // SAVE SERVICE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setSuccess("");

            const serviceData = {
                serviceName: formData.serviceName,
                pricePerHour: Number(formData.pricePerHour),
                description: formData.description
            };


            if (editingService) {

                await api.put(
                    `/services/${editingService.serviceId}`,
                    serviceData
                );

                setSuccess(
                    "Service updated successfully."
                );

            } else {

                await api.post(
                    "/services",
                    serviceData
                );

                setSuccess(
                    "Service added successfully."
                );

            }


            setShowModal(false);

            setEditingService(null);

            setFormData({
                serviceName: "",
                pricePerHour: "",
                description: ""
            });

            await loadServices();

        } catch (err) {

            console.error(err);

            if (err.response?.data?.message) {

                setError(
                    err.response.data.message
                );

            } else {

                setError(
                    "Unable to save service."
                );

            }

        }

    };


    // =========================
    // DELETE SERVICE
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this service?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            setError("");
            setSuccess("");

            await api.delete(
                `/services/${id}`
            );

            setSuccess(
                "Service deleted successfully."
            );

            await loadServices();

        } catch (err) {

            console.error(err);

            if (err.response?.data?.message) {

                setError(
                    err.response.data.message
                );

            } else {

                setError(
                    "Unable to delete service."
                );

            }

        }

    };


    // =========================
    // AVERAGE PRICE
    // =========================

    const averagePrice =
        services.length > 0
            ? services.reduce(
                (total, service) =>
                    total + Number(service.pricePerHour),
                0
            ) / services.length
            : 0;


    return (

        <div className="services-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-heading">

                <div>

                    <h2>Services</h2>

                    <p>
                        Manage photography studio services.
                    </p>

                </div>


                <button
                    className="primary-btn"
                    onClick={handleAdd}
                >
                    + Add Service
                </button>

            </div>


            {/* =========================
                MESSAGES
            ========================= */}

            {loading && (
                <div className="loading-message">
                    Loading services...
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
                        🛍️
                    </div>

                    <div>

                        <span>
                            Total Services
                        </span>

                        <h3>
                            {services.length}
                        </h3>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        💰
                    </div>

                    <div>

                        <span>
                            Average Price / Hour
                        </span>

                        <h3>
                            ₹{averagePrice.toLocaleString(
                                "en-IN",
                                {
                                    maximumFractionDigits: 2
                                }
                            )}
                        </h3>

                    </div>

                </div>

            </div>


            {/* =========================
                SERVICES TABLE
            ========================= */}

            {!loading && !error && (

                <div className="table-card">

                    <div className="table-header">

                        <div>

                            <h3>
                                Service List
                            </h3>

                            <p>
                                All photography services
                            </p>

                        </div>


                        <span className="table-count">
                            {services.length} Services
                        </span>

                    </div>


                    <div className="table-container">

                        <table className="data-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Service</th>

                                    <th>Price / Hour</th>

                                    <th>Description</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {services.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="empty-message"
                                        >
                                            No services found.
                                        </td>

                                    </tr>

                                ) : (

                                    services.map((service) => (

                                        <tr
                                            key={service.serviceId}
                                        >

                                            <td>
                                                #{service.serviceId}
                                            </td>


                                            <td>

                                                <div className="service-name">

                                                    <div className="service-icon">
                                                        📷
                                                    </div>

                                                    <strong>
                                                        {
                                                            service.serviceName
                                                        }
                                                    </strong>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="price-badge">

                                                    ₹
                                                    {Number(
                                                        service.pricePerHour
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </span>

                                            </td>


                                            <td>

                                                <span className="service-description">

                                                    {
                                                        service.description ||
                                                        "No description"
                                                    }

                                                </span>

                                            </td>


                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="edit-btn"
                                                        onClick={() =>
                                                            handleEdit(
                                                                service
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-btn"
                                                        onClick={() =>
                                                            handleDelete(
                                                                service.serviceId
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            )}


            {/* =========================
                ADD / EDIT MODAL
            ========================= */}

            {showModal && (

                <div className="modal-overlay">

                    <div className="modal">

                        <div className="modal-header">

                            <div>

                                <h3>

                                    {editingService
                                        ? "Edit Service"
                                        : "Add Service"}

                                </h3>

                                <p>

                                    {editingService
                                        ? "Update service information."
                                        : "Enter service information."}

                                </p>

                            </div>


                            <button
                                className="modal-close"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="modal-form"
                        >

                            {/* SERVICE NAME */}

                            <div className="form-group">

                                <label>
                                    Service Name
                                </label>

                                <input
                                    type="text"
                                    name="serviceName"
                                    value={
                                        formData.serviceName
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter service name"
                                    required
                                />

                            </div>


                            {/* PRICE */}

                            <div className="form-group">

                                <label>
                                    Price Per Hour
                                </label>

                                <input
                                    type="number"
                                    name="pricePerHour"
                                    value={
                                        formData.pricePerHour
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter price per hour"
                                    min="0"
                                    step="0.01"
                                    required
                                />

                            </div>


                            {/* DESCRIPTION */}

                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter service description"
                                    rows="4"
                                />

                            </div>


                            {/* ACTIONS */}

                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="primary-btn"
                                >

                                    {editingService
                                        ? "Update Service"
                                        : "Add Service"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Services;