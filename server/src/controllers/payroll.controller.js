import prisma from "../utils/prisma.js";

export const generatePayroll = async (req, res) => {
    try {
        const { employeeId, month, year, basicSalary } = req.body;


        const existing = await prisma.payroll.findFirst({
            where: {
                employeeId,
                month,
                year
            }
        });

        if (existing) {
            return res.status(400).json({
                error: "Payroll already generated for this employee in this month"
            });
        }
        // calculations
        const hra = basicSalary * 0.2;
        const da = basicSalary * 0.1;
        const ta = 1500;
        const bonus = 2000;

        const gross = basicSalary + hra + da + ta + bonus;

        const pf = basicSalary * 0.12;
        const tax = gross * 0.1;

        const netSalary = gross - (pf + tax);

        const payroll = await prisma.payroll.create({
            data: {
                employeeId,
                month,
                year,
                basicSalary,
                hra,
                da,
                ta,
                bonus,
                pf,
                tax,
                netSalary
            }
        });

        res.status(201).json(payroll);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPayrolls = async (req, res) => {
    try {
        const payrolls = await prisma.payroll.findMany({
            include: { employee: true },
            orderBy: { createdAt: "desc" }
        });

        res.json(payrolls);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};