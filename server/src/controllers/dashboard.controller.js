import prisma from "../utils/prisma.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalEmployees = await prisma.employee.count();

        const payrolls = await prisma.payroll.findMany();

        const totalPayrollPaid = payrolls.reduce(
            (acc, p) => acc + p.netSalary,
            0
        );

        const avgSalary =
            payrolls.length > 0
                ? totalPayrollPaid / payrolls.length
                : 0;

        const thisMonth = new Date().toLocaleString("default", {
            month: "long",
            year: "numeric"
        });

        const monthlyPayroll = payrolls
            .filter((p) => `${p.month} ${p.year}` === thisMonth)
            .reduce((acc, p) => acc + p.netSalary, 0);

        res.json({
            totalEmployees,
            totalPayrollPaid,
            avgSalary,
            monthlyPayroll
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};