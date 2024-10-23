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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomeData = void 0;
const util_1 = require("util");
const connection_1 = __importDefault(require("../../connection"));
const getData = (0, util_1.promisify)(connection_1.default.query).bind(connection_1.default);
const getHomeData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const membersNum = yield getData({
            sql: 'SELECT COUNT(*) as membersNum FROM members'
        });
        const lendingsNum = yield getData({
            sql: 'SELECT COUNT(*) as lendingsNum FROM member_transactions'
        });
        const booksNum = yield getData({
            sql: 'SELECT COUNT(*) as booksNum FROM books'
        });
        res.status(200).json({
            error: false,
            message: 'Get home page data success',
            data: {
                membersNum,
                lendingsNum,
                booksNum
            }
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: 'Get home page data failed',
            data: {}
        });
    }
});
exports.getHomeData = getHomeData;
