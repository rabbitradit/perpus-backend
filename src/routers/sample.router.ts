import { Router } from "express";
import { findSample } from "../controllers/sample.controller";
const router = Router()

router.get('/', findSample)

export default router