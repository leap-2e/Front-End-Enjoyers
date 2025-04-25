import express from "express";
import { sql } from "./db";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

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
    const { id, username, email, password } = req.body;

    const SALT_ROUND = 12;
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await sql`
    INSERT INTO users
    (id, username, email, password)
    VALUES
     (${id}, ${username}, ${email}, ${hash})
    `
    res.json({ success: true, newUser })
    console.log("success true")
})

app.post('/check', async (req, res) => {

    try {
        const { email, password } = req.body;
        const [user] = await sql`
        SELECT email, password FROM users
        WHERE email = ${email}
    `
        if (user) {
            const isCompare = bcrypt.compareSync(password, user.password);
            if (!isCompare) {
                res.status(401).json({ success: false, message: "User or password is wrong." })
            }
        }

        const KEY: any = process.env.ACCESS_TOKEN_SECRET_KEY;
        const token = jwt.sign({ user }, KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Amjilttai nevterlee", token })
    } catch (error) {
        console.log(error);

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