import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
const Navbar = () => {
    const { logout, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // clear token from context + localStorage

        // small delay ensures state update before redirect
        setTimeout(() => {
            navigate("/login");
        }, 100);
    };

    return (
        <div className="navbar">
            <h3 className="title">Admin Panel</h3>

            <div className="nav-right">
                {token && (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;