import { ErrorRequestHandler } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  if (err instanceof PrismaClientKnownRequestError && err.code === "P2003") {
    res.status(404).json({
      code: 404,
      status: "error",
      message: "Supplier or Product not found",
    });
  }

  if (err.name === "BadRequestError") {
    res.status(400).json({
      code: 400,
      status: "error",
      message: err.message,
    });
  }

  res.status(500).json({
    code: 500,
    status: "error",
    message: "Internal Server Error",
  });
};
