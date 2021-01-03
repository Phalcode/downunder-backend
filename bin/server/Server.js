"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const GameRouter_1 = __importDefault(require("../routes/GameRouter"));
const port = 7777;
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use("/", GameRouter_1.default);
app.listen(port, () => {
    console.log(`7️⃣ 7️⃣  Lowbob 77 Server started on Port ${port}`);
});
