import express from "express";
import { sql } from "./db";
import cors from "cors";

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
    const { username, email, password, profile_id } = req.body;
    const newUser = await sql`
    INSERT INTO users
    (username, email, password, profile_id)
    VALUES
     (${username}, ${email}, ${password}, ${profile_id})
    `
    res.json({ success: true, newUser })
    console.log("success true")
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

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})