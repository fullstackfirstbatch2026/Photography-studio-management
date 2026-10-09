import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Photographers from "./pages/Photographers";
import Services from "./pages/Services";
import Sessions from "./pages/Sessions";
import BookSession from "./pages/BookSession";
import Reports from "./pages/Reports";
import CostCalculation from "./pages/CostCalculation";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route element={<DashboardLayout />}>

                    <Route path="/" element={<Dashboard />} />

                    <Route
                        path="/customers"
                        element={<Customers />}
                    />

                    <Route
                        path="/photographers"
                        element={<Photographers />}
                    />

                    <Route
                        path="/services"
                        element={<Services />}
                    />

                    <Route
                        path="/sessions"
                        element={<Sessions />}
                    />

                    <Route
                        path="/book-session"
                        element={<BookSession />}
                    />
                    <Route path="/cost-calculation" element={<CostCalculation />} />

                    <Route
                        path="/reports"
                        element={<Reports />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;