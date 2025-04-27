import { sql } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    console.log(req.body)
    const { id, username, email, password } = req.body;

    const SALT_ROUND = 12;
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await sql`
    INSERT INTO users
    (id, username, email, password)
    VALUES
     (${id}, ${username}, ${email}, ${hash})
    `
    res.status(200).json({ success: true, newUser })
    console.log("User successfully registered")
}

export const login = async (req: Request, res: Response) => {

    try {
        console.log(req.body)
        const { email, password } = req.body;
        const [user] = await sql`
        SELECT username, email, password FROM users
        WHERE email = ${email}
    `
        if (user) {
            const isCompare = bcrypt.compareSync(password, user.password);
            if (!isCompare) {
                res.status(401).json({ success: false, message: "User or password is wrong." })
            }
        } else {
            res.status(404).json({ success: false, message: "User not found" })
            return;
        }

        const KEY: any = process.env.ACCESS_TOKEN_SECRET_KEY;
        const token = jwt.sign({ user }, KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Amjilttai nevterlee", token })

    } catch (error) {
        console.log(error);

    }
}
