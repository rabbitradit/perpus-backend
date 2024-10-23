import { Router } from "express";
import { getMembers, searchMembers } from "../controllers/members.controller";
import { createMember } from "../controllers/members.controller";
const router = Router()

router.get('/', getMembers)
router.get('/search', searchMembers)
router.post('/', createMember)

export default router