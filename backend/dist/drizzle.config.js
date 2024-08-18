"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : ""
    }
};
