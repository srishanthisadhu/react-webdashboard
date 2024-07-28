import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/NavBar.css'; // Ensure your CSS file is imported

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <div className="nav-bar">
            <Link to="/main" className="nav-link">Home</Link>
            <button onClick={handleLogout} className="nav-button">Logout</button>
        </div>
    );
};

export default NavBar;
