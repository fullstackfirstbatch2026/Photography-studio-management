import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function DashboardLayout() {

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-section">

                <Header />

                <main className="page-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;