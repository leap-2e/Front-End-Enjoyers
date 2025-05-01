import { Router } from "express";
import { donation, getDonataionInfo } from "../controller/donations";

const donationRouter = Router();
donationRouter.post("/", donation).get("/", getDonataionInfo)

export { donationRouter }