function Header() {
    return (
        <header className="header">

            <div className="header-title">
                <h1>Photography Studio</h1>
                <p>Management System</p>
            </div>

            <div className="header-right">

                <button className="notification-btn">
                    🔔
                </button>

                <div className="header-profile">
                    <div className="profile-avatar">
                        A
                    </div>

                    <div className="profile-info">
                        <strong>Admin</strong>
                        <span>Studio Manager</span>
                    </div>
                </div>

            </div>

        </header>
    );
}

export default Header;