import { Request, Response } from "express";
import { sql } from "../db";

export const getCardsInfo = async (_req: Request, res: Response) => {
  const cards = await sql`
SELECT * FROM cards
`;
  res.json({ success: true, cards });
};

export const createPaymentInfo = async (req: Request, res: Response) => {
  const {
    id,
    country,
    first_name,
    last_name,
    card_number,
    expiry_year,
    expiry_month,
    cvv,
    user_id,
  } = req.body;
  const cardInfo = await sql`
    INSERT INTO cards 
    (id, country, first_name, last_name, card_number, expiry_year, expiry_month, cvv, user_id)
    VALUES 
    (${id}, ${country}, ${first_name}, ${last_name}, ${card_number}, ${expiry_year}, ${expiry_month}, ${cvv}, ${user_id})
    `;
  res.json({ success: true });
};

export const updatePaymentInfo = async (req: Request, res: Response) => {
  const {
    id,
    country,
    first_name,
    last_name,
    card_number,
    expiry_year,
    expiry_month,
    cvv,
    user_id,
  } = req.body;

  const updateInfo = await sql`
    UPDATE cards
    SET id = ${id},
    country = ${country},
    first_name = ${first_name},
    last_name = ${last_name}, 
    card_number = ${card_number}, 
    expiry_year = ${expiry_year}, 
    expiry_month = ${expiry_month}, 
    cvv = ${cvv}
    WHERE user_id = ${user_id}
    `;
};
