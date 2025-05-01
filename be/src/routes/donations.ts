import { Router } from "express";
import { donation, getDonataionInfo, totalAmount } from "../controller/donations";

const donationRouter = Router();
donationRouter.post("/", donation).get("/", getDonataionInfo).get("/total", totalAmount)

export { donationRouter }