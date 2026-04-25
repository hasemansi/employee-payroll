import express from "express";
import { generatePayroll, getPayrolls } from "../controllers/payroll.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, generatePayroll);
router.get("/", authMiddleware, getPayrolls);

export default router;