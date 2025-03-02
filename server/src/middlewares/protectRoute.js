import jwt from "jsonwebtoken";
import Account from "../models/account.model.js"; // Adjust path as needed

const protectRoute =
  (requiredRoles = []) =>
  async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      console.log("Token is", token);
      
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        console.error("JWT Verification Error:", error.name, error.message);
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
      }

      // Fetch the user from the database
      const user = await Account.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      // Role-based access control check
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return res.status(401).json({ message: "Unauthorized: Insufficient privileges" });
      }
      // Attach user to request and proceed
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware:", error.name, error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export default protectRoute;
