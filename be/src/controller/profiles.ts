import { sql } from "../db";
import { Response, Request } from "express";

export const getProfile = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  const profile = await sql`
    SELECT * FROM profiles
    WHERE user_id = ${user_id}
    `;
  res.json({ success: true, profile });
};

export const getProfiles = async (_req: Request, res: Response) => {
  const profiles = await sql`SELECT * FROM profiles`;
  res.json({ success: true, profiles });
};

export const createProfile = async (req: Request, res: Response) => {
  const { id, name, about, avatar_image, social_media_url, user_id } = req.body;

  const newProfile = await sql`
    INSERT INTO profiles 
    (id, name, about, avatar_image, social_media_url, user_id)
    VALUES 
    (${id}, ${name}, ${about}, ${avatar_image}, ${social_media_url}, ${user_id})
    `;

  console.log(newProfile);
  res.status(200).json({ message: "Profile created successfully" });
};

export const addCover = async (req: Request , res: Response)  => {
  const { background_image, user_id } = req.body;
  const cover = await sql`
  UPDATE profiles
  SET background_image = ${background_image}
  WHERE user_id = ${user_id}
  `
res.json({success: true, cover})
} 

export const updateProfile = async (req: Request, res: Response) => {
  const { id, name, about, social_media_url, avatar_image, user_id } = req.body;

  const updatedProfile = await sql`
    UPDATE profiles
    SET id = ${id},
    name = ${name},
    about = ${about},
    social_media_url = ${social_media_url},
    avatar_image = ${avatar_image}
    WHERE user_id = ${user_id}
    `;

  res.status(200).json({ message: "Profile updated successfully." });
};
