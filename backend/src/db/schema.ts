import { pgTable, serial, text, pgEnum, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    display_picture_link: text("display_picture_link"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export const messageTypeEnum = pgEnum("message_type", ["text", "file"]);
export const messages = pgTable("message", {
    id: serial("id").primaryKey(),
    from_user: integer("from_user").references(() => users.id),
    to_user: integer("to_user").references(() => users.id),
    message_type: messageTypeEnum('message_type'),
    text_message: text("text_message"),
    media_file_link: text("media_file_link"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;