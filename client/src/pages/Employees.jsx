import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/layout/Layout";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeModal from "../components/EmployeeModal";
import "../styles/employee.css";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔄 Fetch Employees
    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const res = await API.get("/employees");
            setEmployees(res.data);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to fetch employees");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
  const loadEmployees = async () => {
    await fetchEmployees();
  };

  loadEmployees();
}, []);

    // ➕ Add / ✏️ Update Employee
    const handleSave = async (data) => {
        try {
            if (selected) {
                await API.put(`/employees/${selected.id}`, data);
            } else {
                await API.post("/employees", data);
            }

            setOpen(false);
            setSelected(null);
            fetchEmployees();
        } catch (error) {
            alert(error.response?.data?.message || "Error saving employee");
        }
    };

    // ❌ Delete Employee
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;

        try {
            await API.delete(`/employees/${id}`);
            fetchEmployees();
        } catch (error) {
            alert(error.response?.data?.message || "Error deleting employee");
        }
    };

    return (
        <Layout>
            <div className="employee-page">

                {/* Header */}
                <div className="table-header">
                    <h2>Employee Management</h2>
                    <button onClick={() => setOpen(true)}>+ Add Employee</button>
                </div>

                {/* Table */}
                <div className="table-container">
                    {loading ? (
                        <p>Loading...</p>
                    ) : employees.length === 0 ? (
                        <p>No employees found</p>
                    ) : (
                        <EmployeeTable
                            employees={employees}
                            onEdit={(emp) => {
                                setSelected(emp);
                                setOpen(true);
                            }}
                            onDelete={handleDelete}
                        />
                    )}
                </div>

                {/* Modal */}
                <EmployeeModal
                    isOpen={open}
                    onClose={() => {
                        setOpen(false);
                        setSelected(null);
                    }}
                    onSave={handleSave}
                    employee={selected}
                />
            </div>
        </Layout>
    );
};

export default Employees;