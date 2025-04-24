import express from "express";
import { sql } from "./db";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (_req, res) => {
    const result = await sql`SELECT NOW() AS time`;
    res.send(`Hello from Naraa! Server time: ${result[0].time}`);
});

app.get('/users', async (_req, res) => {
    const users = await sql`
    SELECT * FROM users
    `
    res.json({ success: true, users })
})

app.post('/users', async (req, res) => {
    const { username, email, password, profile_id, card_id } = req.body;

    // const SALT_ROUND = 12;
    // const salt = bcrypt.genSaltSync(SALT_ROUND);
    // const hash = bcrypt.hashSync(password, salt);

    const newUser = await sql`
    INSERT INTO users
    (username, email, password, profile_id, card_id)
    VALUES
     (${username}, ${email}, ${password}, ${profile_id}, ${card_id})
    `
    res.json({ success: true, newUser })
    console.log("success true")
})

app.post('/check', async (req, res) => {

    const { email, password } = req.body;
    const user_email = await sql`
    SELECT email FROM users
    WHERE email = ${email}
    `
    if (user_email) {
        const hash: any = await sql`
        SELECT password FROM users
        WHERE email = ${user_email}
        `
        const isCompare = bcrypt.compareSync(password, hash);
        if (!isCompare) {
            res.status(401).json({ success: false, message: "User or password is wrong." })
        }
    }
})

app.post('/profiles', async (req, res) => {
    const { id, name, about, avatar_image, social_media_url } = req.body;
    const newProfile = await sql`
    INSERT INTO profiles 
    (id, name, about, avatar_image, social_media_url)
    VALUES 
    (${id}, ${name}, ${about}, ${avatar_image}, ${social_media_url})
    `
    res.json({ success: true })
})

app.post('/cards', async (req, res) => {
    const { id, country, first_name, last_name, card_number, expiry_year, expiry_month, cvv } = req.body
    const cardInfo = await sql`
    INSERT INTO cards 
    (id, country, first_name, last_name, card_number, expiry_year, expiry_month, cvv)
    VALUES 
    (${id}, ${country}, ${first_name}, ${last_name}, ${card_number}, ${expiry_year}, ${expiry_month}, ${cvv})
    `
    res.json({ success: true })
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})