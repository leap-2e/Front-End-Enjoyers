import { sql } from "../db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const getUsers = async (req: Request, res: Response) => {
  const { username } = req.query;
  const users = await sql`
    SELECT * FROM users
    WHERE username = ${username}
    `
  res.json({ success: true, users });
};

export const updatePassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const SALT_ROUND = 12;
  const salt = bcrypt.genSaltSync(SALT_ROUND);
  const hash = bcrypt.hashSync(password, salt);

  const updatePassword = await sql`
    UPDATE users
    SET password = ${hash}
    WHERE email = ${email}
    `;

  res.json({ message: "Password updated successfully" });
};
