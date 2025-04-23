import express from "express";
import sql from "./db";

const app = express();
app.use(express.json());

app.get('/', async(req, res) => {
    const result = await sql`SELECT NOW() AS time`;
    res.send(`Hello from Express + PostgreSQL! Server time: ${result[0].time}`);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})