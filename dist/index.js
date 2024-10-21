"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3100;
let whitelist = ['http://localhost:3000'];
app.use((0, cors_1.default)({
    // origin: function(origin: any, callback: any) {
    //     if(whitelist.indexOf(origin) !== -1) {
    //         callback(null, true)
    //     } else {
    //         callback(new Error(('Not allowed by CORS')))
    //     }
    // }
    origin: '*'
}));
const routers_1 = __importDefault(require("./routers"));
app.use(routers_1.default);
app.listen(port, () => {
    console.log(`[server] Server is running on http://localhost:${port}`);
});
