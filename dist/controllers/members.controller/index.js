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
exports.countMembers = exports.createMember = exports.getMembers = void 0;
const query_sql_1 = require("../../util/query.sql");
const uuid_1 = require("uuid");
const getMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, idSearch, page = 1, limit_data = 5 } = req.query;
        let members;
        const offset = Number(limit_data) * (Number(page) - 1);
        if (!search) {
            members = yield (0, query_sql_1.querySql)('SELECT * FROM members LIMIT ? OFFSET ?', [Number(limit_data), offset]);
        }
        else if (search && !idSearch) {
            members = yield (0, query_sql_1.querySql)('SELECT * FROM members WHERE id LIKE ? or name LIKE ? or email LIKE ? LIMIT ? OFFSET ?', [search, search, search, Number(limit_data), offset]);
        }
        else if (idSearch && !search) {
            members = yield (0, query_sql_1.querySql)('SELECT * FROM MEMBERS WHERE id LIKE ?', [idSearch]);
        }
        const totalData = yield (0, query_sql_1.querySql)('SELECT COUNT(*) as totalData FROM members', []);
        const totalPage = Math.ceil(totalData[0].totalData);
        res.status(200).json({
            error: false,
            message: 'Get data members success',
            data: { members, totalPage }
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: 'Get data members failed',
            data: {}
        });
    }
});
exports.getMembers = getMembers;
const createMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, phone_number, address, id_card_number } = req.body;
        const randId = (0, uuid_1.v4)();
        const id = `MMBER-${randId.slice(0, 10)}-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDay() + 1}`;
        const created_at = new Date();
        const checkDuplicate = yield (0, query_sql_1.querySql)('SELECT * FROM members where email = ? OR phone_number = ? OR id_card_number = ?', [email, phone_number, id_card_number]);
        console.log(checkDuplicate);
        if (checkDuplicate.length > 0) {
            console.log(checkDuplicate);
            throw { msg: 'Email or Phone Number or ID Card Number have been used' };
        }
        yield (0, query_sql_1.querySql)('INSERT INTO members(id, first_name, last_name, email, phone_number, address, id_card_number, created_at) values(?, ?, ?, ?, ?, ?, ?, ?)', [id, first_name, last_name, email, phone_number, address, id_card_number, created_at]);
        res.status(201).json({
            error: false,
            message: 'create data member success',
            data: {
                id,
                first_name,
                last_name,
                email,
                phone_number,
                address,
                id_card_number
            }
        });
    }
    catch (error) {
        res.status(error.status || 500).json({
            error: true,
            message: error.msg,
            data: {}
        });
    }
});
exports.createMember = createMember;
const countMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const membersNum = yield (0, query_sql_1.querySql)('SELECT COUNT(*) FROM members', []);
});
exports.countMembers = countMembers;
