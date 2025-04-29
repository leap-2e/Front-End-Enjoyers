import { Router } from "express";
import { getUsers, updatePassword } from "../controller/users";

const userRouter = Router();
userRouter.get("/", getUsers).put("/new-password", updatePassword);

export { userRouter };
