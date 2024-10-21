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
exports.loginStaff = void 0;
const query_sql_1 = require("../../util/query.sql");
const date_fns_1 = require("date-fns");
const loginStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const staff = yield (0, query_sql_1.querySql)(`SELECT * FROM staffs 
            JOIN staff_schedule on staff_schedule.id = staffs.staff_schedule_id
            JOIN library_branch on library_branch.id = staffs.library_branch_id 
            where staffs.username = ? AND staffs.password = ?`, [username, password]);
        if (staff.length <= 0)
            throw { msg: 'Username or password invalid', status: 406 };
        if (!((0, date_fns_1.isAfter)((0, date_fns_1.format)(new Date(), 'yyyy-MM-dd kk:mm:ss'), `${(0, date_fns_1.format)(new Date(), 'yyyy-MM-dd')} ${staff[0].start_schedule}`) &&
            (0, date_fns_1.isBefore)((0, date_fns_1.format)(new Date(), 'yyyy-MM-dd kk:mm:ss'), `${(0, date_fns_1.format)(new Date(), 'yyyy-MM-dd')} ${staff[0].end_schedule}`))) {
            throw { msg: 'Login Failed!', status: 406 };
        }
        res.status(200).json({
            error: false,
            message: 'Login Success',
            data: {
                username,
                role: 'STAFF',
                id: staff[0].id,
                name: staff[0].name
            }
        });
    }
    catch (error) {
        res.status(error.status || 500).json({
            error: true,
            message: error.msg || error.message,
            data: {}
        });
    }
});
exports.loginStaff = loginStaff;
