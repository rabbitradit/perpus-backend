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
exports.getAdminDataDashboard = void 0;
const query_sql_1 = require("../../util/query.sql");
const getAdminDataDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const dummyid = 0
        // const countMembers = await querySql(
        //     'SELECT count(*) FROM staffs inner join members on members.staffs_id = staffs.id group by staffs.id having staffs.id = ?', 
        //     [dummyid]
        // )
        const countMembers = yield (0, query_sql_1.querySql)('select count(*) from members', []);
        const countLendings = yield (0, query_sql_1.querySql)('select count(*) from member_transactions', []);
        const countBooks = yield (0, query_sql_1.querySql)('select count(*) from books', []);
        res.status(200).json({
            error: false,
            message: 'get admin data dashboard success',
            data: {
                countBooks,
                countLendings,
                countMembers
            }
        });
    }
    catch (error) {
        res.status(error.message || 500).json({
            error: true,
            message: error.message,
            data: {}
        });
    }
});
exports.getAdminDataDashboard = getAdminDataDashboard;
