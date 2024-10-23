import { Router } from "express";
import { getBooksBySearch } from "../controllers/books.controller";
const router = Router()

router.get('/search', getBooksBySearch)

export default router