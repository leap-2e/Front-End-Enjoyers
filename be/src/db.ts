import postgres from "postgres";
import dotenv from "dotenv"

dotenv.config();
const DATA_BASE = process.env.DATA_BASE;

const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: DATA_BASE,
    // username: "Buy-Me-Coffee_owner",
    // password: "npg_GdJKmNSQ51OW",
})

export default sql