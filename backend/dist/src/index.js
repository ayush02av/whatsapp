"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routers/auth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});
