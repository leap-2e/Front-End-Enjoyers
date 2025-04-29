import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const verifyToken = ( req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers)
  try {
    if (!req.headers["authorization"]) {
      res.status(401).json({ success: false, message: "Unaurozation" });
      return;
    }

    const token = req.headers["authorization"].split(" ")[1];
    console.log(token)
    const KEY = process.env.JWT_SECRET;
    const decode = jwt.verify(token, KEY!);

    next();
  } catch (error: unknown) {
    console.log(error, "error")
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
