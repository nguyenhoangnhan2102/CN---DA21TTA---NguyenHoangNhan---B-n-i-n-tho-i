const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Received token:", token);

    if (token == null) {
        console.log("No token provided."); // Log thông báo không có token
        return res
            .status(401)
            .json({ EM: "Token required", EC: 401, DT: "No token provided" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Invalid token error:", err); // Log lỗi nếu token không hợp lệ
            return res
                .status(403)
                .json({ EM: "Invalid token", EC: 0, DT: err.message });
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
