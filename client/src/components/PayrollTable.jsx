import API from "../api/axios";

const downloadPayslip = async (id) => {
    try {
        const res = await API.get(`/payslip/${id}`, {
            responseType: "blob"
        });

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", `payslip-${id}.pdf`);

        document.body.appendChild(link);
        link.click();
        link.remove();

    } catch (error) {
        console.log(error);
        alert("Error downloading payslip");
    }
};

const PayrollTable = ({ payrolls }) => {
    return (
        <div className="payroll-table">
            <h3>Payroll Records</h3>

            <table>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Basic</th>
                        <th>Net Salary</th>
                        <th>Payslip</th>
                    </tr>
                </thead>

                <tbody>
                    {payrolls.map((p) => (
                        <tr key={p.id}>
                            <td>{p.employee?.name}</td>
                            <td>{p.month}</td>
                            <td>{p.year}</td>
                            <td>{p.basicSalary}</td>
                            <td>{p.netSalary}</td>
                            <td>
                                <button onClick={() => downloadPayslip(p.id)}>
                                    Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PayrollTable;