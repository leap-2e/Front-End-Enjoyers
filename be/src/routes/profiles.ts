import { Router } from "express";
import {
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
} from "../controller/profiles";
import { verifyToken } from "../middleware/verify-token";

const profileRouter = Router();
profileRouter
  .get("/", getProfiles)
  .get("/", getProfile)
  .post("/", createProfile)
  .put("/", verifyToken, updateProfile);

export { profileRouter };
