"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const init_tables_1 = require("./utils/init.tables");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    await (0, init_tables_1.initTables)();
    app_1.default.listen(PORT, () => {
        console.log(`http://localhost: ${PORT}`);
    });
};
startServer();
