import dotenv from "dotenv";
dotenv.config();

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack || err.message);

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
