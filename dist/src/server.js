"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("../routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.port;
// bodyparser setup
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
(0, routes_1.routes)(app);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(PORT, () => {
    console.log(`⚡️ [Server]: Server is running at https://localhost:${PORT}`);
});
