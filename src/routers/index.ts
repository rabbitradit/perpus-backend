import { Router } from "express";
import dashboardRouter from './dashboard.router'
import membersRouter from './members.router'
import authRouter from './auth.router'
import homeRouter from './home.router'
import booksRouter from './books.router'
const router = Router()

// router.use('/', loginStaff)
router.use('/admin', dashboardRouter)
router.use('/members', membersRouter)
router.use('/auth', authRouter)
router.use('/home', homeRouter)
router.use('/books', booksRouter)

export default router;