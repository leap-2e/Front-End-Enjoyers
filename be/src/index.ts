import express from "express";
import { sql } from "./db";
import cors from "cors";
import dotenv from "dotenv"
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/users";
import { profileRouter } from "./routes/profiles";
import { cardRouter } from "./routes/cards";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/cards", cardRouter)

app.get('/', async (_req, res) => {
    const result = await sql`SELECT NOW() AS time`;
    res.send(`Hello from Naraa! Server time: ${result[0].time}`);
});

// app.get('/users', async (_req, res) => {
//     const users = await sql`
//     SELECT * FROM users
//     `
//     res.json({ success: true, users })
// })

// app.post('/users', async (req, res) => {
//     console.log(req.body)
//     const { id, username, email, password } = req.body;

//     const SALT_ROUND = 12;
//     const salt = bcrypt.genSaltSync(SALT_ROUND);
//     const hash = bcrypt.hashSync(password, salt);

//     const newUser = await sql`
//     INSERT INTO users
//     (id, username, email, password)
//     VALUES
//      (${id}, ${username}, ${email}, ${hash})
//     `
//     res.status(200).json({ success: true, newUser })
//     console.log("User successfully registered")
// })

// app.post('/check', async (req, res) => {

//     try {
//         const { email, password } = req.body;
//         const [user] = await sql`
//         SELECT email, password FROM users
//         WHERE email = ${email}
//     `
//         if (user) {
//             const isCompare = bcrypt.compareSync(password, user.password);
//             if (!isCompare) {
//                 res.status(401).json({ success: false, message: "User or password is wrong." })
//             }
//         }

//         const KEY: any = process.env.ACCESS_TOKEN_SECRET_KEY;
//         const token = jwt.sign({ user }, KEY, { expiresIn: '1h' });
//         // console.log(token, "token   ")
//         res.status(200).json({ message: "Amjilttai nevterlee", token })

//     } catch (error) {
//         console.log(error);

//     }
// })

// app.get('/profiles', async (_req, res) => {
//     const profiles = await sql`
//     SELECT * FROM profiles`
//     res.json({ success: true, profiles })
// })

// app.post('/profiles', async (req, res) => {
//     const { id, name, about, avatar_image, social_media_url, user_id } = req.body;

//     const newProfile = await sql`
//     INSERT INTO profiles 
//     (id, name, about, avatar_image, social_media_url, user_id)
//     VALUES 
//     (${id}, ${name}, ${about}, ${avatar_image}, ${social_media_url}, ${user_id})
//     `

//     console.log(newProfile)
//     res.json({ success: true })
// })

// app.post('/cards', async (req, res) => {
//     const { id, country, first_name, last_name, card_number, expiry_year, expiry_month, cvv, user_id } = req.body
//     const cardInfo = await sql`
//     INSERT INTO cards 
//     (id, country, first_name, last_name, card_number, expiry_year, expiry_month, cvv)
//     VALUES 
//     (${id}, ${country}, ${first_name}, ${last_name}, ${card_number}, ${expiry_year}, ${expiry_month}, ${cvv}, ${user_id})
//     `
//     res.json({ success: true })
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})