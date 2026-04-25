import { useState, useEffect } from "react";

const EmployeeModal = ({ isOpen, onClose, onSave, employee }) => {
    const [form, setForm] = useState({
        name: "",
        designation: "",
        email: "",
        phone: "",
        department: "",
        joiningDate: ""
    });

   useEffect(() => {
  if (!isOpen) return;

  if (employee) {
    setForm({
      name: employee.name || "",
      designation: employee.designation || "",
      email: employee.email || "",
      phone: employee.phone || "",
      department: employee.department || "",
      joiningDate: employee.joiningDate
        ? employee.joiningDate.split("T")[0]
        : ""
    });
  } else {
    // Reset form when adding new employee
    setForm({
      name: "",
      designation: "",
      email: "",
      phone: "",
      department: "",
      joiningDate: ""
    });
  }
}, [employee, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{employee ? "Edit" : "Add"} Employee</h3>

                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                    <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} />
                    <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                    <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
                    <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />

                    <input
                        type="date"
                        name="joiningDate"
                        value={form.joiningDate}
                        onChange={handleChange}
                    />

                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeModal;