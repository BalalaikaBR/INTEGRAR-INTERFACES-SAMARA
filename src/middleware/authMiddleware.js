const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY;

const authToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido ou inválido" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido!" });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = authToken;