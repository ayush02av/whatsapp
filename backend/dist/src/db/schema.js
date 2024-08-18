"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = exports.messageTypeEnum = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    display_picture_link: (0, pg_core_1.text)("display_picture_link"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.messageTypeEnum = (0, pg_core_1.pgEnum)("message_type", ["text", "file"]);
exports.messages = (0, pg_core_1.pgTable)("message", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    from_user: (0, pg_core_1.integer)("from_user").references(() => exports.users.id),
    to_user: (0, pg_core_1.integer)("to_user").references(() => exports.users.id),
    message_type: (0, exports.messageTypeEnum)('message_type'),
    text_message: (0, pg_core_1.text)("text_message"),
    media_file_link: (0, pg_core_1.text)("media_file_link"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
