import { Link, useNavigate } from 'react-router-dom';
import './css/NavBar.css';

const NavBar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); 

    const handleLogout = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('role'); 
        navigate('/login');
    };

    return (
        <div className="nav-bar">
            <div className="nav-links">
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/change-password" className="nav-link">Change Password</Link> 
                {role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
            </div>
            <button onClick={handleLogout} className="nav-button">Logout</button>
        </div>
    );
};

export default NavBar;
