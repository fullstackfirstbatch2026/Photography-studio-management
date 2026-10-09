import { useEffect, useState } from "react";
import api from "../services/api";

function Photographers() {

    const [photographers, setPhotographers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingPhotographer, setEditingPhotographer] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        phone: ""
    });


    // =========================
    // LOAD PHOTOGRAPHERS
    // =========================

    useEffect(() => {
        loadPhotographers();
    }, []);


    const loadPhotographers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/photographers");

            setPhotographers(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load photographers. Make sure the Spring Boot backend is running."
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
    // ADD PHOTOGRAPHER
    // =========================

    const handleAdd = () => {

        setEditingPhotographer(null);

        setFormData({
            name: "",
            specialization: "",
            phone: ""
        });

        setError("");
        setSuccess("");

        setShowModal(true);
    };


    // =========================
    // EDIT PHOTOGRAPHER
    // =========================

    const handleEdit = (photographer) => {

        setEditingPhotographer(photographer);

        setFormData({
            name: photographer.name,
            specialization: photographer.specialization,
            phone: photographer.phone
        });

        setError("");
        setSuccess("");

        setShowModal(true);
    };


    // =========================
    // SAVE PHOTOGRAPHER
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setSuccess("");

            if (editingPhotographer) {

                await api.put(
                    `/photographers/${editingPhotographer.photographerId}`,
                    formData
                );

                setSuccess(
                    "Photographer updated successfully."
                );

            } else {

                await api.post(
                    "/photographers",
                    formData
                );

                setSuccess(
                    "Photographer added successfully."
                );
            }

            setShowModal(false);

            setEditingPhotographer(null);

            setFormData({
                name: "",
                specialization: "",
                phone: ""
            });

            await loadPhotographers();

        } catch (err) {

            console.error(err);

            if (err.response?.data?.message) {

                setError(err.response.data.message);

            } else {

                setError(
                    "Unable to save photographer."
                );
            }
        }
    };


    // =========================
    // DELETE PHOTOGRAPHER
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this photographer?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(
                `/photographers/${id}`
            );

            setSuccess(
                "Photographer deleted successfully."
            );

            await loadPhotographers();

        } catch (err) {

            console.error(err);

            if (err.response?.data?.message) {

                setError(err.response.data.message);

            } else {

                setError(
                    "Unable to delete photographer."
                );
            }
        }
    };


    // =========================
    // SPECIALIZATIONS
    // =========================

    const specializations = [
        "Wedding Photography",
        "Portrait Photography",
        "Fashion Photography",
        "Event Photography",
        "Product Photography"
    ];


    return (

        <div className="photographers-page">

            {/* PAGE HEADER */}

            <div className="page-heading">

                <div>

                    <h2>Photographers</h2>

                    <p>
                        Manage photography studio photographers.
                    </p>

                </div>

                <button
                    className="primary-btn"
                    onClick={handleAdd}
                >
                    + Add Photographer
                </button>

            </div>


            {/* MESSAGES */}

            {loading && (
                <div className="loading-message">
                    Loading photographers...
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


            {/* STATISTICS */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon">
                        📸
                    </div>

                    <div>

                        <span>Total Photographers</span>

                        <h3>
                            {photographers.length}
                        </h3>

                    </div>

                </div>

            </div>


            {/* TABLE */}

            {!loading && !error && (

                <div className="table-card">

                    <div className="table-header">

                        <div>

                            <h3>
                                Photographer List
                            </h3>

                            <p>
                                All registered photographers
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

                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Specialization</th>
                                    <th>Phone</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {photographers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="empty-message"
                                        >
                                            No photographers found.
                                        </td>

                                    </tr>

                                ) : (

                                    photographers.map(
                                        (photographer) => (

                                            <tr
                                                key={
                                                    photographer.photographerId
                                                }
                                            >

                                                <td>
                                                    #
                                                    {
                                                        photographer.photographerId
                                                    }
                                                </td>

                                                <td>

                                                    <div className="customer-name">

                                                        <div className="customer-avatar">
                                                            {photographer.name
                                                                ?.charAt(0)
                                                                ?.toUpperCase()}
                                                        </div>

                                                        <strong>
                                                            {
                                                                photographer.name
                                                            }
                                                        </strong>

                                                    </div>

                                                </td>

                                                <td>

                                                    <span className="specialization-badge">

                                                        {
                                                            photographer.specialization
                                                        }

                                                    </span>

                                                </td>

                                                <td>
                                                    {
                                                        photographer.phone
                                                    }
                                                </td>

                                                <td>

                                                    <div className="action-buttons">

                                                        <button
                                                            className="edit-btn"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    photographer
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    photographer.photographerId
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

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


            {/* MODAL */}

            {showModal && (

                <div className="modal-overlay">

                    <div className="modal">

                        <div className="modal-header">

                            <div>

                                <h3>
                                    {editingPhotographer
                                        ? "Edit Photographer"
                                        : "Add Photographer"}
                                </h3>

                                <p>
                                    {editingPhotographer
                                        ? "Update photographer information."
                                        : "Enter photographer information."}
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

                            {/* NAME */}

                            <div className="form-group">

                                <label>
                                    Photographer Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter photographer name"
                                    required
                                />

                            </div>


                            {/* SPECIALIZATION */}

                            <div className="form-group">

                                <label>
                                    Specialization
                                </label>

                                <select
                                    name="specialization"
                                    value={
                                        formData.specialization
                                    }
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select specialization
                                    </option>

                                    {specializations.map(
                                        (specialization) => (

                                            <option
                                                key={specialization}
                                                value={specialization}
                                            >
                                                {specialization}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* PHONE */}

                            <div className="form-group">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
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
                                    {editingPhotographer
                                        ? "Update Photographer"
                                        : "Add Photographer"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Photographers;