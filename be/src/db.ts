import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";

dotenv.config();

const DATA_BASE = process.env.DATA_BASE || "";

export const sql = neon(DATA_BASE);
