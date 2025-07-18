import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AdminModel from "../models/admin.model.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// register
export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res.status(400);
      throw new Error("All fields are required.");
    }

    const existingUser = await AdminModel.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AdminModel({ email, name, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res
      .status(res.statusCode !== 200 ? res.statusCode : 500)
      .json({ error: error.message });
  }
};



// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required.");
    }

    const user = await AdminModel.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7h",
      }
    );

    res.json({
      token,
      admin: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    res
      .status(res.statusCode !== 200 ? res.statusCode : 500)
      .json({ error: error.message });
  }
};
