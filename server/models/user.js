import mongoose from "mongoose";

const userSechmea = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "supervisor", "salesman"],
      required: true,
      default: "salesman",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSechmea);

export default UserModel;
