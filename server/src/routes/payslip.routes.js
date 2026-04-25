import express from "express";
import { downloadPayslip } from "../controllers/payslip.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, downloadPayslip);

export default router;