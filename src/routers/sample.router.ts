import { Router } from "express";
import { findSample } from "../controllers/sample.controller";
const router = Router()

router.post('/', findSample)

export default router