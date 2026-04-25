import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/layout/Layout";
import PayrollForm from "../components/PayrollForm";
import PayrollTable from "../components/PayrollTable";
import "../styles/payroll.css";

const Payroll = () => {
    const [payrolls, setPayrolls] = useState([]);

    const fetchPayrolls = async () => {
        const res = await API.get("/payroll");
        setPayrolls(res.data);
    };

    useEffect(() => {
        fetchPayrolls();
    }, []);

    return (
        <Layout>
            <div className="payroll-page">
                <PayrollForm onSuccess={fetchPayrolls} />
                <PayrollTable payrolls={payrolls} />
            </div>
        </Layout>
    );
};

export default Payroll;