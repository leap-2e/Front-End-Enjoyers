import { Router } from "express";
import { login, logout, register } from "../controller/auth";

const authRouter = Router();
authRouter
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout);

export { authRouter };
