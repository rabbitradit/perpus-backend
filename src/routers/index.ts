import { Router } from "express";
import dashboardRouter from './dashboard.router'
import membersRouter from './members.router'
import authRouter from './auth.router'
const router = Router()

// router.use('/', loginStaff)
router.use('/admin', dashboardRouter)
router.use('/members', membersRouter)
router.use('/auth', authRouter)

export default router;