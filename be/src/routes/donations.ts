import { Router } from "express";
import { donation } from "../controller/donations";

const donationRouter = Router();
donationRouter.post("/", donation)

export { donationRouter }