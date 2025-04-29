import { Router } from "express";
import { login, register } from "../controller/auth";
import { verifyToken } from "../middleware/verify-token";

const authRouter = Router();
authRouter.post("/register", register).post("/check", login);

export { authRouter };
