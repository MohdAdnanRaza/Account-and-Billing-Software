import UserModel from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const existUser = await UserModel.findOne({ email });
//     if (existUser) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User already Exist" });
//     }
//     const hashPassword = await bcryptjs.hashSync(password, 10);
//     const newUser = new UserModel({
//       name,
//       email,
//       password: hashPassword,
//       role,
//     });
//     await newUser.save();
//     res.status(200).json({ message: "user register successfully", newUser });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error" });
//     console.log(error);
//   }
// };

// //login
// const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid credentials" });
//     }
//     //check password is correct or not
//     const ispasswordValid = await bcryptjs.compare(password, user.password);
//     if (!ispasswordValid) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid credentials" });
//     }
//     const token = jwt.sign(
//       { userId: user._id, name: user.name, role: user.role },
//       process.env.JWT_SECRET
//     );
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       maxAge: 3600000,
//     });

//     res
//       .status(200)
//       .json({ success: true, message: "Login successfully", user, token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal server error" });
//     console.log(error);
//   }
// };
const register = async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;
    const existUser = await UserModel.findOne({ phone });
    if (existUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }
    const hashPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new UserModel({
      name,
      phone,
      password: hashPassword,
      role,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};

const Login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await UserModel.findOne({ phone });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res
      .status(200)
      .json({ success: true, message: "Login successfully", user, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};
//Logout api
const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "user Logout successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
};
// Check if admin or supervisor already exists
//Check if Admin or Supervisor roles are already registered
const checkRegisteredRoles = async (req, res) => {
  try {
    const adminExists = await UserModel.findOne({ role: "admin" });
    const supervisorExists = await UserModel.findOne({ role: "supervisor" });

    res.status(200).json({
      adminRegistered: !!adminExists,
      supervisorRegistered: !!supervisorExists,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, "name phone role"); // Fetch name, phone, and role only
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

export { register, Login, Logout, checkRegisteredRoles, getUsers };
