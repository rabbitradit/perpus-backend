import { Router } from "express";
import { loginStaff } from "../controllers/auth.controller";
const router = Router()

router.post('/', loginStaff)

export default router