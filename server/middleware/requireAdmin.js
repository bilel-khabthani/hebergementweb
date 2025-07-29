const requireAdmin = (req, res, next) => {
  console.log("User role:", req.user?.role); // <--- log du role
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required. Please log in with an admin account." });
  }
  next();
};

export default requireAdmin;
