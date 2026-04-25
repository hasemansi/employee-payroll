const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Designation</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Joining Date</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.designation}</td>
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
            <td>{emp.department}</td>
            <td>{new Date(emp.joiningDate).toLocaleDateString()}</td>
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button className="delete" onClick={() => onDelete(emp.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;