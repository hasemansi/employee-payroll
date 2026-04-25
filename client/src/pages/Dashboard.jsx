import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/layout/Layout";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import "../styles/dashboard.css";

const Dashboard = () => {
    const [stats, setStats] = useState({});
    const [payrollData, setPayrollData] = useState([]);

    const fetchStats = async () => {
        const res = await API.get("/dashboard");
        setStats(res.data);
    };

    const fetchPayroll = async () => {
        const res = await API.get("/payroll");

        const grouped = res.data.reduce((acc, item) => {
            const key = item.month;

            const found = acc.find((x) => x.month === key);

            if (found) {
                found.total += item.netSalary;
            } else {
                acc.push({ month: key, total: item.netSalary });
            }

            return acc;
        }, []);

        setPayrollData(grouped);
    };

    useEffect(() => {
        fetchStats();
        fetchPayroll();
    }, []);

    return (
        <Layout>
            {/* HEADER */}
            <div style={{ padding: "10px 0" }}>
                <h2 style={{ marginBottom: "5px" }}>Admin Dashboard</h2>
                <p style={{ color: "#64748b" }}>
                    Welcome back 👋 Here’s your system overview
                </p>
            </div>

            {/* DASHBOARD GRID */}
            <div className="dashboard">

                {/* CARDS */}
                <div className="card">
                    <h3>Total Employees</h3>
                    <p>{stats.totalEmployees}</p>
                </div>

                <div className="card">
                    <h3>Total Payroll Paid</h3>
                    <p>₹ {stats.totalPayrollPaid}</p>
                </div>

                <div className="card">
                    <h3>Average Salary</h3>
                    <p>₹ {stats.avgSalary?.toFixed(2)}</p>
                </div>

                <div className="card">
                    <h3>This Month Payroll</h3>
                    <p>₹ {stats.monthlyPayroll}</p>
                </div>

                {/* CHART */}
                <div className="chart-box">
                    <h3>Monthly Payroll Trend</h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={payrollData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </Layout>
    );
};

export default Dashboard;