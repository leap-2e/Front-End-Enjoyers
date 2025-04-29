import { Router } from "express";
import {
  createPaymentInfo,
  getCardsInfo,
  updatePaymentInfo,
} from "../controller/cards";

const cardRouter = Router();
cardRouter
  .get("/", getCardsInfo)
  .post("/", createPaymentInfo)
  .put("/", updatePaymentInfo);

export { cardRouter };
