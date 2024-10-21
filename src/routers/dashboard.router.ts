import { Router } from "express";
import { getAdminDataDashboard } from "../controllers/dashboard.controller";
const router = Router()

router.get('/', getAdminDataDashboard)

export default router