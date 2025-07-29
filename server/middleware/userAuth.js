import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userAuth = (req, res, next) => {
  const token = req.cookies.token || req.headers["x-token"];
  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required: token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT payload:", decoded); // <--- Ajouté ici pour debug
    req.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;
