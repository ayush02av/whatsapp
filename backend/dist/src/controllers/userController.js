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
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const drizzle_orm_1 = require("drizzle-orm");
const setup_1 = __importDefault(require("../db/setup"));
const schema_1 = require("../db/schema");
class UserController {
    static userTokenObject(user) {
        var _a;
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                display_picture_link: user.display_picture_link,
            },
            token: jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email
            }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "JWT_SECRET", { expiresIn: '8h' })
        };
    }
    static onboardUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { email, password } = req.body;
            const userCheck = yield setup_1.default.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email)).limit(1);
            if (userCheck.length == 1) {
                // existing user
                const user = userCheck[0];
                const passwordCheck = yield bcrypt_1.default.compare(password, user.password);
                if (passwordCheck == false)
                    res.status(401).send("Incorrect credentials");
                else
                    res.status(200).json(UserController.userTokenObject(user));
            }
            else {
                // new user
                const result = yield setup_1.default.insert(schema_1.users).values({
                    email: email,
                    password: yield bcrypt_1.default.hash(password, (_a = process.env.SALT_ROUNDS) !== null && _a !== void 0 ? _a : 10),
                    name: email.split('@')[0]
                }).returning();
                const user = result[0];
                res.status(201).json(UserController.userTokenObject(user));
            }
        });
    }
}
exports.UserController = UserController;
