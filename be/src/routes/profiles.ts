import { Router } from "express";
import {
  addCover,
  createProfile,
  getProfile,
  getProfiles,
  updateProfile,
} from "../controller/profiles";
import { verifyToken } from "../middleware/verify-token";

const profileRouter = Router();
profileRouter
  .get("/all", getProfiles)
  .get("/", getProfile)
  .post("/", createProfile)
  .post("/image", addCover)
  .put("/", verifyToken, updateProfile);

export { profileRouter };
