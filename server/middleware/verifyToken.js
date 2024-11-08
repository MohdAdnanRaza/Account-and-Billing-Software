import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
const checkRole = (roles) => async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized:No token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "user is not found" });
    }
    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: `Unauthorized: Access restricted for ${user.role}` });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
export const isAdmin = checkRole(["admin"]);
export const isSalesman = checkRole(["salesman"]);
export const isSupervisor = checkRole(["supervisor"]);
export default checkRole;
