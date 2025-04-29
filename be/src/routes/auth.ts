import { Router } from "express";
import { login, register } from "../controller/auth";

const authRouter = Router();
authRouter.post("/register", register).post("/login", login);

export { authRouter };
