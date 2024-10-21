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
const loginStaff = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const staff = yield (0, query_sql_1.querySql)('SELECT * FROM staffs', [username, password]);
        console.log(staff);
        // if(staff!.length <= 0) throw {message: 'username or password invalid!', status: 406}
    }
    catch (error) {
        res.status(error.status || 500).json({
            error: true,
            message: error.message,
            data: {}
        });
    }
});
exports.loginStaff = loginStaff;
