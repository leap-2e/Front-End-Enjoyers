import { sql } from "../db";
import { Request, Response } from "express";

export const getDonataionInfo = async(req: Request, res: Response) => {
  const { user_id } = req.query;
  const donations = await sql`
    SELECT profiles.name as name, profiles.avatar_image as avatar, donations.amount as amount, donations.created_at as date, donations.social_media_url as url, donations.special_message as message
    FROM donations
    FULL JOIN profiles ON profiles.user_id = donations.donor_id 
    WHERE recipient_id = ${user_id}
`
res.json({success: true, donations})
}

export const donation = async (req: Request, res: Response) => {
    const { id, amount, special_message, social_media_url, donor_id, recipient_id } = req.body;
    const donation = await sql`
      INSERT INTO donations
      ( id, amount, special_message, social_media_url, donor_id, recipient_id) 
      VALUES
      ( ${id}, ${amount}, ${special_message}, ${social_media_url}, ${donor_id}, ${recipient_id} )
    `;
    res.json({ message: "Amjiltai handivlalaa", donation })
}


  