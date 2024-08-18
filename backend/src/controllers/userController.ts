import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

import db from "../db/setup";
import { users, User } from "../db/schema";

export class UserController {
    static userTokenObject(user: User): Object {
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                display_picture_link: user.display_picture_link,
            },
            token: jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET ?? "JWT_SECRET",
                { expiresIn: '8h' }
            )
        }
    }

    static async onboardUser(req: Request, res: Response): Promise<void> {
        const { email, password }: { email: string, password: string } = req.body;

        const userCheck = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (userCheck.length == 1) {
            // existing user
            const user: User = userCheck[0];
            const passwordCheck = await bcrypt.compare(password, user.password);

            if (passwordCheck == false)
                res.status(401).send("Incorrect credentials");
            else
                res.status(200).json(UserController.userTokenObject(user));
        }
        else {
            // new user
            const result = await db.insert(users).values({
                email: email,
                password: await bcrypt.hash(password, process.env.SALT_ROUNDS ?? 10),
                name: email.split('@')[0]
            }).returning();
            const user: User = result[0];
            res.status(201).json(UserController.userTokenObject(user));
        }
    }
}