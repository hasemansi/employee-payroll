import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            login(res.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Error");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>Employee Payroll System</h2>
                <p style={{ marginBottom: "15px", fontSize: "13px", opacity: 0.8 }}>
                    Login to your admin dashboard
                </p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input name="email" placeholder="Email" onChange={handleChange} />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                    <button type="submit">Login</button>
                </form>

                <div className="auth-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;