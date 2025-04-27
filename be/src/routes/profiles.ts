
import { Router } from "express";
import { createProfile, getProfiles, updateProfile } from "../controller/profiles";

const profileRouter = Router();
profileRouter.get('/', getProfiles).post('/', createProfile).put('/', updateProfile)

export { profileRouter }