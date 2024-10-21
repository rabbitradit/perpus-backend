"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooks = void 0;
const query_sql_1 = require("../../util/query.sql");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.body;
        let books;
        if (!search) {
            books = yield (0, query_sql_1.querySql)('SELECT * FROM books', []);
        }
        else {
            books = yield (0, query_sql_1.querySql)('SELECT * FROM books WHERE title LIKE ? or author LIKE ?', [search, search]);
        }
        res.status(200).json({
            error: false,
            message: 'Get books data success',
            data: books
        });
    }
    catch (error) {
        res.status(error.status || 500).json({
            error: false,
            message: 'Get books data success',
            data: []
        });
    }
});
exports.getBooks = getBooks;
