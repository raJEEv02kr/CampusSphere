const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.redirect("/");
    }
}

module.exports = authenticateToken;
