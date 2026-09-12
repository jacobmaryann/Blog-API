const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User.model.js");

const requireAuth = async (req, res, next) => {
    const authHeader = req.header ('Authorization');

    if (!authHeader || !authHeader.startsWith("Bearer"))
        return res.status(401).json({ message: "Access denied, no token" });

    const token = authHeader.replace("Bearer ", "");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(payload.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = requireAuth;