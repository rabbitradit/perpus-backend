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
exports.createLendingData = exports.getLendingData = void 0;
const query_sql_1 = require("../../util/query.sql");
const uuid_1 = require("uuid");
const getLendingData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const lendingData = yield (0, query_sql_1.querySql)('SELECT * FROM member_transactions as mt INNER JOIN member_transaction_details as mtd on mt.id = mtd.id WHERE mt.id = ?', [id]);
        res.status(200).json({
            error: false,
            message: 'get lending detail data success',
            data: lendingData
        });
    }
    catch (error) {
        res.status(500).json({
            error: false,
            message: 'get lending detail data success',
            data: {}
        });
    }
});
exports.getLendingData = getLendingData;
const createLendingData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { members_id, books_id } = req.body;
        const staffs_id = 1;
        const id = (0, uuid_1.v4)();
        const due_date = new Date().setDate(new Date().getDate() + 3);
        yield (0, query_sql_1.querySql)('INSERT INTO member_transactions(members_id, staffs_id, due_date) values(?, ?, ?)', [id, members_id, staffs_id, due_date]);
        const member_transactions_id = id;
        for (let i = 0; i < books_id.length; i++) {
            yield (0, query_sql_1.querySql)('INSERT INTO member_transaction_details(books_id, member_transactions_id) values(?, ?)', [books_id, member_transactions_id]);
        }
        res.status(201).json({
            error: false,
            message: 'Create transaction data success',
            data: {
                members_id,
                books_id
            }
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: 'Create transaction data failed',
            data: {}
        });
    }
});
exports.createLendingData = createLendingData;
