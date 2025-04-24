import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            res.status(401).json({ success: false, message: "Unaurozation" });
            return;
        }
        
        const [_, token] = req.headers['authorization'].split('');
        const KEY: any = process.env.ACCESS_TOKEN_SECRET_KEY;
        const decode = jwt.verify(token, KEY);

        next();

    } catch (error: unknown) {
        res.json({ success: false, message: error.message })
    }
}