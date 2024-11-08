import express from "express";
import {
  Login,
  Logout,
  register,
  getUsers,
} from "../controllers/AuthController.js";

import {
  isAdmin,
  isSalesman,
  isSupervisor,
} from "../middleware/verifyToken.js";
import { checkRegisteredRoles } from "../controllers/AuthController.js";
const AuthRoutes = express.Router();

AuthRoutes.post("/register", register);
AuthRoutes.post("/login", Login);
AuthRoutes.post("/logout", Logout);
AuthRoutes.get("/users", getUsers);

AuthRoutes.get("/admin", isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome Admin" });
});

AuthRoutes.get("/salesman", isSalesman, (req, res) => {
  res.status(200).json({ message: "Welcome Salesman" });
});

AuthRoutes.get("/supervisor", isSupervisor, (req, res) => {
  res.status(200).json({ message: "Welcome Supervisor" });
});
AuthRoutes.get("/check-roles", checkRegisteredRoles);

export default AuthRoutes;
