import { sql } from "../db";
import { Request, Response } from "express";

export const donation = async (req: Request, res: Response) => {
    console.log(req.body)
    const { id, amount, special_message, social_media_url, donor_id, recipient_id } = req.body;
    const donation = await sql`
      INSERT INTO donations
      ( id, amount, special_message, social_media_url, donor_id, recipient_id) 
      VALUES
      ( ${id}, ${amount}, ${special_message}, ${social_media_url}, ${donor_id}, ${recipient_id} )
    `;
    res.json({ message: "Amjiltai handivlalaa", donation })
}


