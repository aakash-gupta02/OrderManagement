import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import AdminModel from "../models/admin.model.js";

dotenv.config();

const adminMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Authorization token is required.");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await AdminModel.findById(decoded.id);

    if (!admin) {
      res.status(403);
      throw new Error("All fields are required.");
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(res.statusCode === 200 ? 401 : res.statusCode);
    next(error);
  }
};

export default adminMiddleware;
