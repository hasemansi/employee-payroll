import PDFDocument from "pdfkit";
import prisma from "../utils/prisma.js";

export const downloadPayslip = async (req, res) => {
    try {
        const { id } = req.params;

        const payroll = await prisma.payroll.findUnique({
            where: { id: Number(id) },
            include: { employee: true }
        });

        if (!payroll) {
            return res.status(404).json({ error: "Payroll not found" });
        }

        const doc = new PDFDocument();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=payslip-${payroll.employee.name}.pdf`
        );

        doc.pipe(res);

        // Header
        doc.fontSize(20).text("Employee Payslip", { align: "center" });
        doc.moveDown();

        // Employee Info
        doc.fontSize(12).text(`Name: ${payroll.employee.name}`);
        doc.text(`Email: ${payroll.employee.email}`);
        doc.text(`Department: ${payroll.employee.department}`);
        doc.text(`Month: ${payroll.month} ${payroll.year}`);
        doc.moveDown();

        // Salary Breakdown
        doc.text(`Basic Salary: ${payroll.basicSalary}`);
        doc.text(`HRA: ${payroll.hra}`);
        doc.text(`DA: ${payroll.da}`);
        doc.text(`TA: ${payroll.ta}`);
        doc.text(`Bonus: ${payroll.bonus}`);
        doc.text(`PF: ${payroll.pf}`);
        doc.text(`Tax: ${payroll.tax}`);
        doc.moveDown();

        // Final Salary
        doc.fontSize(14).text(`Net Salary: ${payroll.netSalary}`, {
            bold: true
        });

        doc.end();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};