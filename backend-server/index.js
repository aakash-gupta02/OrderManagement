import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./route/admin.route.js";
import adminMiddleware from "./middleware/admin.middleware.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { mediaUpload } from "./middleware/multer.middleware.js";
import orderRoute from "./route/order.route.js";

import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    origin: "https://order-management-jade.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
// centralize error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send({
    message: "Order Management System API is running",
  });
});

global.io = io;

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// all routes
app.use("/auth", adminRoutes);
app.use("/order", orderRoute);



server.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running on port  http://localhost:${process.env.PORT || 5000}`
  );
});
