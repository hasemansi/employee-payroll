import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import payrollRoutes from "./routes/payroll.routes.js";
import payslipRoutes from "./routes/payslip.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/payslip", payslipRoutes);
app.use("/api/dashboard", dashboardRoutes);


// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Employee Payroll API' });
});

export default app;