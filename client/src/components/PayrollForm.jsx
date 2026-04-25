import { useEffect, useState } from "react";
import API from "../api/axios";

const PayrollForm = ({ onSuccess }) => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    month: "",
    year: "",
    basicSalary: ""
  });

  // fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await API.get("/employees");
      setEmployees(res.data);
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/payroll", {
        ...form,
        employeeId: Number(form.employeeId),  
        basicSalary: Number(form.basicSalary),
        year: Number(form.year)
      });

      alert("Payroll generated!");
      setForm({ employeeId: "", month: "", year: "", basicSalary: "" });
      onSuccess();

    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="payroll-form">
      <h3>Generate Payroll</h3>

      <form onSubmit={handleSubmit}>
        <select name="employeeId" value={form.employeeId} onChange={handleChange}>
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input name="month" placeholder="Month" value={form.month} onChange={handleChange} />
        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <input
          name="basicSalary"
          type="number"
          placeholder="Basic Salary"
          value={form.basicSalary}
          onChange={handleChange}
        />

        <button type="submit">Generate</button>
      </form>
    </div>
  );
};

export default PayrollForm;