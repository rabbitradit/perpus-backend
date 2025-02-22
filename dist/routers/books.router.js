"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = require("../controllers/books.controller");
const router = (0, express_1.Router)();
router.get('/search', books_controller_1.getBooksBySearch);
exports.default = router;
