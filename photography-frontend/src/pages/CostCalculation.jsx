import { useEffect, useState } from "react";
import api from "../services/api";

function CostCalculation() {

    const [services, setServices] = useState([]);

    const [formData, setFormData] = useState({
        serviceId: "",
        startTime: "",
        endTime: ""
    });

    const [cost, setCost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [calculating, setCalculating] = useState(false);
    const [error, setError] = useState("");


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

            const response =
                await api.get("/services");

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

        setCost(null);
        setError("");

    };


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
    // SELECTED SERVICE
    // =========================

    const selectedService = services.find(
        service =>
            service.serviceId ===
            Number(formData.serviceId)
    );


    // =========================
    // CALCULATE COST
    // =========================

    const handleCalculate = async (e) => {

        e.preventDefault();

        setError("");
        setCost(null);


        if (!formData.serviceId) {

            setError(
                "Please select a service."
            );

            return;
        }


        if (
            !formData.startTime ||
            !formData.endTime
        ) {

            setError(
                "Please select start time and end time."
            );

            return;
        }


        if (duration <= 0) {

            setError(
                "End time must be later than start time."
            );

            return;
        }


        try {

            setCalculating(true);


            const response = await api.get(
                "/sessions/cost",
                {
                    params: {
                        serviceId:
                            Number(formData.serviceId),

                        startTime:
                            formData.startTime,

                        endTime:
                            formData.endTime
                    }
                }
            );


            setCost(response.data);

        } catch (err) {

            console.error(err);

            if (
                err.response?.data?.message
            ) {

                setError(
                    err.response.data.message
                );

            } else {

                setError(
                    "Unable to calculate session cost."
                );

            }

        } finally {

            setCalculating(false);

        }

    };


    // =========================
    // RESET
    // =========================

    const handleReset = () => {

        setFormData({
            serviceId: "",
            startTime: "",
            endTime: ""
        });

        setCost(null);
        setError("");

    };


    if (loading) {

        return (
            <div className="loading-message">
                Loading services...
            </div>
        );

    }


    return (

        <div className="cost-page">

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="page-heading">

                <div>

                    <h2>
                        Cost Calculation
                    </h2>

                    <p>
                        Calculate the cost of a photography session.
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


            <div className="cost-layout">


                {/* =========================
                    CALCULATION FORM
                ========================= */}

                <div className="cost-card">

                    <div className="card-header">

                        <div>

                            <h3>
                                Session Details
                            </h3>

                            <p>
                                Select a service and session duration.
                            </p>

                        </div>

                        <span>
                            💰
                        </span>

                    </div>


                    <form
                        onSubmit={handleCalculate}
                        className="cost-form"
                    >


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

                                            {service.serviceName}
                                            {" - ₹"}
                                            {Number(
                                                service.pricePerHour
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                            /hour

                                        </option>

                                    )
                                )}

                            </select>

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


                        {/* BUTTONS */}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={handleReset}
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                className="primary-btn"
                                disabled={calculating}
                            >

                                {calculating
                                    ? "Calculating..."
                                    : "Calculate Cost"}

                            </button>

                        </div>

                    </form>

                </div>


                {/* =========================
                    RESULT
                ========================= */}

                <div className="cost-result-card">

                    <div className="result-icon">
                        💰
                    </div>

                    <h3>
                        Session Cost
                    </h3>

                    <p>
                        {selectedService
                            ? selectedService.serviceName
                            : "Select a service"}
                    </p>


                    <div className="result-cost">

                        ₹
                        {cost !== null
                            ? Number(cost).toLocaleString(
                                "en-IN",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )
                            : "0.00"}

                    </div>


                    <div className="result-details">

                        <div className="result-row">

                            <span>
                                Hourly Rate
                            </span>

                            <strong>

                                {selectedService
                                    ? `₹${Number(
                                        selectedService.pricePerHour
                                    ).toLocaleString(
                                        "en-IN"
                                    )}`
                                    : "-"}

                            </strong>

                        </div>


                        <div className="result-row">

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


                        <div className="result-row">

                            <span>
                                Calculation
                            </span>

                            <strong>
                                MySQL Function
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CostCalculation;