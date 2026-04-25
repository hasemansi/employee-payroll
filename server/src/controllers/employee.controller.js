import prisma from "../utils/prisma.js";

// CREATE EMPLOYEE
export const createEmployee = async (req, res) => {
    try {
        const {
            name,
            designation,
            email,
            phone,
            department,
            joiningDate
        } = req.body;

        // validation
        if (!name || !designation || !email || !phone || !department || !joiningDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // check duplicate email
        const existing = await prisma.employee.findUnique({
            where: { email }
        });

        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const employee = await prisma.employee.create({
            data: {
                name,
                designation,
                email,
                phone,
                department,
                joiningDate: new Date(joiningDate)
            }
        });

        res.status(201).json(employee);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL EMPLOYEES
export const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany({
            orderBy: { createdAt: "desc" }
        });

        res.json(employees);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET SINGLE EMPLOYEE
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await prisma.employee.findUnique({
            where: { id: parseInt(id) }
        });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(employee);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE EMPLOYEE
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await prisma.employee.update({
            where: { id: parseInt(id) },
            data: {
                ...req.body,
                joiningDate: req.body.joiningDate
                    ? new Date(req.body.joiningDate)
                    : undefined
            }
        });

        res.json(updated);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE EMPLOYEE
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.employee.delete({
            where: { id: parseInt(id) }
        });

        res.json({ message: "Employee deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};