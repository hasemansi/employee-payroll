import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Banknote,
    LogOut,
    Menu
} from "lucide-react";
import "../../styles/sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            {/* TOP */}
            <div className="top">
                {!collapsed && <h2 className="logo">Payroll Pro</h2>}

                <button
                    className="toggle-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <Menu size={20} />
                </button>
            </div>

            <NavLink
                to="/dashboard"
                end
                className={({ isActive }) => (isActive ? "link active" : "link")}
            >
                <LayoutDashboard size={18} />
                {!collapsed && <span>Dashboard</span>}
            </NavLink>

            <NavLink
                to="/employees"
                className={({ isActive }) => (isActive ? "link active" : "link")}
            >
                <Users size={18} />
                {!collapsed && <span>Employees</span>}
            </NavLink>

            <NavLink
                to="/payroll"
                className={({ isActive }) => (isActive ? "link active" : "link")}
            >
                <Banknote size={18} />
                {!collapsed && <span>Payroll</span>}
            </NavLink>

            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "link logout active" : "link logout"
                }
            >
                <LogOut size={18} />
                {!collapsed && <span>Logout</span>}
            </NavLink>

        </div>
    );
};

export default Sidebar;