import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function BookSession() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [photographers, setPhotographers] = useState([]);
    const [services, setServices] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        customerId: "",
        photographerId: "",
        serviceId: "",
        sessionDate: "",
        startTime: "",
        endTime: ""
    });


    // =========================
    // LOAD FORM DATA
    // =========================

    useEffect(() => {
        loadFormData();
    }, []);


    const loadFormData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                customersResponse,
                photographersResponse,
                servicesResponse
            ] = await Promise.all([
                api.get("/customers"),
                api.get("/photographers"),
                api.get("/services")
            ]);

            setCustomers(customersResponse.data);
            setPhotographers(photographersResponse.data);
            setServices(servicesResponse.data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load booking information. Please check the backend."
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

        setError("");
        setSuccess("");

    };


    // =========================
    // SELECTED DATA
    // =========================

    const selectedCustomer = customers.find(
        customer =>
            customer.customerId === Number(formData.customerId)
    );

    const selectedPhotographer = photographers.find(
        photographer =>
            photographer.photographerId === Number(
                formData.photographerId
            )
    );

    const selectedService = services.find(
        service =>
            service.serviceId === Number(formData.serviceId)
    );


    // =========================
    // CALCULATE DURATION
    // =========================

    const calculateDuration = () => {

        if (
            !formData.startTime ||
            !formData.endTime
        ) {
            return 0;
        }

        const start = new Date(
            `1970-01-01T${formData.startTime}`
        );

        const end = new Date(
            `1970-01-01T${formData.endTime}`
        );

        const difference =
            (end - start) /
            (1000 * 60 * 60);

        return difference > 0
            ? difference
            : 0;
    };


    const duration = calculateDuration();


    // =========================
    // ESTIMATED COST
    // =========================

    const estimatedCost =
        selectedService && duration > 0
            ? Number(selectedService.pricePerHour) * duration
            : 0;


    // =========================
    // BOOK SESSION
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Validate time

        if (duration <= 0) {

            setError(
                "End time must be later than start time."
            );

            return;
        }


        // Validate all fields

        if (
            !formData.customerId ||
            !formData.photographerId ||
            !formData.serviceId ||
            !formData.sessionDate ||
            !formData.startTime ||
            !formData.endTime
        ) {

            setError(
                "Please fill all required fields."
            );

            return;
        }


        try {

            setSubmitting(true);


            const bookingData = {
                customerId: Number(
                    formData.customerId
                ),

                photographerId: Number(
                    formData.photographerId
                ),

                serviceId: Number(
                    formData.serviceId
                ),

                sessionDate:
                    formData.sessionDate,

                startTime:
                    formData.startTime,

                endTime:
                    formData.endTime
            };


            console.log(
                "Booking request:",
                bookingData
            );


            await api.post(
                "/sessions/book",
                bookingData
            );


            setSuccess(
                "Session booked successfully."
            );


            // Reset form

            setFormData({
                customerId: "",
                photographerId: "",
                serviceId: "",
                sessionDate: "",
                startTime: "",
                endTime: ""
            });


            // Navigate after successful booking

            setTimeout(() => {

                navigate("/sessions");

            }, 1200);


        } catch (err) {

            console.error(err);


            // MySQL trigger error

            if (
                err.response?.data?.message
            ) {

                setError(
                    err.response.data.message
                );

            } else if (
                err.response?.data
            ) {

                setError(
                    String(err.response.data)
                );

            } else {

                setError(
                    "Unable to book session. Please try again."
                );

            }

        } finally {

            setSubmitting(false);

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="loading-message">
                Loading booking information...
            </div>
        );

    }


    return (

        <div className="book-session-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-heading">

                <div>

                    <h2>
                        Book Session
                    </h2>

                    <p>
                        Schedule a new photography session.
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
                SUCCESS
            ========================= */}

            {success && (

                <div className="success-message">
                    {success}
                </div>

            )}


            <div className="booking-layout">


                {/* =========================
                    BOOKING FORM
                ========================= */}

                <div className="booking-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                Session Details
                            </h3>

                            <p>
                                Enter the session information.
                            </p>

                        </div>

                        <span>
                            📅
                        </span>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="booking-form"
                    >


                        {/* CUSTOMER */}

                        <div className="form-group">

                            <label>
                                Customer
                            </label>

                            <select
                                name="customerId"
                                value={
                                    formData.customerId
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="">
                                    Select customer
                                </option>

                                {customers.map(
                                    customer => (

                                        <option
                                            key={
                                                customer.customerId
                                            }
                                            value={
                                                customer.customerId
                                            }
                                        >
                                            {
                                                customer.name
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* PHOTOGRAPHER */}

                        <div className="form-group">

                            <label>
                                Photographer
                            </label>

                            <select
                                name="photographerId"
                                value={
                                    formData.photographerId
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="">
                                    Select photographer
                                </option>

                                {photographers.map(
                                    photographer => (

                                        <option
                                            key={
                                                photographer.photographerId
                                            }
                                            value={
                                                photographer.photographerId
                                            }
                                        >
                                            {
                                                photographer.name
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* SERVICE */}

                        <div className="form-group">

                            <label>
                                Service
                            </label>

                            <select
                                name="serviceId"
                                value={
                                    formData.serviceId
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="">
                                    Select service
                                </option>

                                {services.map(
                                    service => (

                                        <option
                                            key={
                                                service.serviceId
                                            }
                                            value={
                                                service.serviceId
                                            }
                                        >
                                            {
                                                service.serviceName
                                            }
                                            {" - ₹"}
                                            {
                                                Number(
                                                    service.pricePerHour
                                                ).toLocaleString(
                                                    "en-IN"
                                                )
                                            }
                                            /hour
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* DATE */}

                        <div className="form-group">

                            <label>
                                Session Date
                            </label>

                            <input
                                type="date"
                                name="sessionDate"
                                value={
                                    formData.sessionDate
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* TIME */}

                        <div className="time-row">

                            <div className="form-group">

                                <label>
                                    Start Time
                                </label>

                                <input
                                    type="time"
                                    name="startTime"
                                    value={
                                        formData.startTime
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    End Time
                                </label>

                                <input
                                    type="time"
                                    name="endTime"
                                    value={
                                        formData.endTime
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                        </div>


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="calculate-btn"
                            disabled={submitting}
                        >

                            {submitting
                                ? "Booking..."
                                : "Book Session"}

                        </button>

                    </form>

                </div>


                {/* =========================
                    SUMMARY
                ========================= */}

                <div className="booking-summary">

                    <div className="summary-header">

                        <h3>
                            Booking Summary
                        </h3>

                        <span>
                            📸
                        </span>

                    </div>


                    <div className="summary-content">


                        {/* CUSTOMER */}

                        <div className="summary-row">

                            <span>
                                Customer
                            </span>

                            <strong>
                                {selectedCustomer
                                    ? selectedCustomer.name
                                    : "-"}
                            </strong>

                        </div>


                        {/* PHOTOGRAPHER */}

                        <div className="summary-row">

                            <span>
                                Photographer
                            </span>

                            <strong>
                                {selectedPhotographer
                                    ? selectedPhotographer.name
                                    : "-"}
                            </strong>

                        </div>


                        {/* SPECIALIZATION */}

                        <div className="summary-row">

                            <span>
                                Specialization
                            </span>

                            <strong>
                                {selectedPhotographer
                                    ? selectedPhotographer.specialization
                                    : "-"}
                            </strong>

                        </div>


                        {/* SERVICE */}

                        <div className="summary-row">

                            <span>
                                Service
                            </span>

                            <strong>
                                {selectedService
                                    ? selectedService.serviceName
                                    : "-"}
                            </strong>

                        </div>


                        {/* DATE */}

                        <div className="summary-row">

                            <span>
                                Date
                            </span>

                            <strong>
                                {formData.sessionDate
                                    ? formData.sessionDate
                                    : "-"}
                            </strong>

                        </div>


                        {/* TIME */}

                        <div className="summary-row">

                            <span>
                                Time
                            </span>

                            <strong>
                                {formData.startTime &&
                                formData.endTime
                                    ? `${formData.startTime} - ${formData.endTime}`
                                    : "-"}
                            </strong>

                        </div>


                        {/* DURATION */}

                        <div className="summary-row">

                            <span>
                                Duration
                            </span>

                            <strong>
                                {duration > 0
                                    ? `${duration} hour${
                                        duration !== 1
                                            ? "s"
                                            : ""
                                    }`
                                    : "-"}
                            </strong>

                        </div>


                        {/* COST */}

                        <div className="summary-total">

                            <span>
                                Estimated Cost
                            </span>

                            <strong>
                                ₹
                                {estimatedCost.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BookSession;