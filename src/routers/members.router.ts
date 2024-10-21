import { Router } from "express";
import { getMembers } from "../controllers/members.controller";
import { createMember } from "../controllers/members.controller";
const router = Router()

router.get('/', getMembers)
router.post('/', createMember)

export default router