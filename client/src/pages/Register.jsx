import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/auth/register", form);
            alert("Registered successfully");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Error");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2>Employee Payroll System</h2>
                <p style={{ marginBottom: "15px", fontSize: "13px", opacity: 0.8 }}>
                    Register
                </p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" onChange={handleChange} />
                    <input name="email" placeholder="Email" onChange={handleChange} />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} />
                    <button type="submit">Register</button>
                </form>

                <div className="auth-link">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;