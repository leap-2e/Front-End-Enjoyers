import express from "express";
import { sql } from "./db";

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    const result = await sql`SELECT NOW() AS time`;
    res.send(`Hello from Express + PostgreSQL! Server time: ${result[0].time}`);
});
app.post('/', async (req, res) => {
    const { name, about } = req.body
    const newProfile = await sql`INSERT INTO profiles (name, about)
    VALUES (${name}, ${about})
    `
    res.json({ success: true, newProfile })
    console.log("success true")
})



const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})