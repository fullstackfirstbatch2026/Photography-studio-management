import { useEffect, useState } from "react";
import api from "../services/api";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingCustomer, setEditingCustomer] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });


    // =========================
    // LOAD CUSTOMERS
    // =========================

    useEffect(() => {
        loadCustomers();
    }, []);


    const loadCustomers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/customers");

            setCustomers(response.data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load customers. Make sure the Spring Boot backend is running."
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

        setEditingCustomer(null);

        setFormData({
            name: "",
            email: "",
            phone: ""
        });

        setError("");
        setSuccess("");

        setShowModal(true);
    };


    // =========================
    // OPEN EDIT MODAL
    // =========================

    const handleEdit = (customer) => {

        setEditingCustomer(customer);

        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone
        });

        setError("");
        setSuccess("");

        setShowModal(true);
    };


    // =========================
    // SUBMIT FORM
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setSuccess("");

            if (editingCustomer) {

                // UPDATE CUSTOMER

                await api.put(
                    `/customers/${editingCustomer.customerId}`,
                    formData
                );

                setSuccess("Customer updated successfully.");

            } else {

                // ADD CUSTOMER

                await api.post(
                    "/customers",
                    formData
                );

                setSuccess("Customer added successfully.");

            }

            setShowModal(false);

            setFormData({
                name: "",
                email: "",
                phone: ""
            });

            setEditingCustomer(null);

            await loadCustomers();

        } catch (err) {

            console.error(err);

            if (err.response?.data?.message) {

                setError(err.response.data.message);

            } else {

                setError(
                    "Unable to save customer. Please check the backend."
                );

            }

        }

    };


    // =========================
    // DELETE CUSTOMER
    // =========================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await api.delete(`/customers/${id}`);

            setSuccess("Customer deleted successfully.");

            await loadCustomers();

        } catch (err) {

            console.error(err);

            if (err.response?.data?.message) {

                setError(err.response.data.message);

            } else {

                setError(
                    "Unable to delete customer."
                );

            }

        }

    };


    // =========================
    // STATISTICS
    // =========================

    const totalCustomers = customers.length;


    return (

        <div className="customers-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-heading">

                <div>

                    <h2>Customers</h2>

                    <p>
                        Manage photography studio customers.
                    </p>

                </div>

                <button
                    className="primary-btn"
                    onClick={handleAdd}
                >
                    + Add Customer
                </button>

            </div>


            {/* =========================
                MESSAGES
            ========================= */}

            {loading && (
                <div className="loading-message">
                    Loading customers...
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
                STAT CARD
            ========================= */}

            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon">
                        👥
                    </div>

                    <div>

                        <span>Total Customers</span>

                        <h3>
                            {totalCustomers}
                        </h3>

                    </div>

                </div>

            </div>


            {/* =========================
                CUSTOMER TABLE
            ========================= */}

            {!loading && !error && (

                <div className="table-card">

                    <div className="table-header">

                        <div>

                            <h3>
                                Customer List
                            </h3>

                            <p>
                                All registered customers
                            </p>

                        </div>

                        <span className="table-count">
                            {customers.length} Customers
                        </span>

                    </div>


                    <div className="table-container">

                        <table className="data-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                {customers.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="empty-message"
                                        >
                                            No customers found.
                                        </td>

                                    </tr>

                                ) : (

                                    customers.map((customer) => (

                                        <tr
                                            key={customer.customerId}
                                        >

                                            <td>
                                                #{customer.customerId}
                                            </td>

                                            <td>

                                                <div className="customer-name">

                                                    <div className="customer-avatar">
                                                        {customer.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}
                                                    </div>

                                                    <strong>
                                                        {customer.name}
                                                    </strong>

                                                </div>

                                            </td>

                                            <td>
                                                {customer.email}
                                            </td>

                                            <td>
                                                {customer.phone}
                                            </td>

                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="edit-btn"
                                                        onClick={() =>
                                                            handleEdit(customer)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() =>
                                                            handleDelete(
                                                                customer.customerId
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
                                    {editingCustomer
                                        ? "Edit Customer"
                                        : "Add Customer"}
                                </h3>

                                <p>
                                    {editingCustomer
                                        ? "Update customer information."
                                        : "Enter customer information."}
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
                                    Customer Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter customer name"
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    required
                                />

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


                            {/* BUTTONS */}

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
                                    {editingCustomer
                                        ? "Update Customer"
                                        : "Add Customer"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Customers;