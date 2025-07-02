// src/index.ts
import express from "express";
import authRoute from "./routes/auth";
import indexRoute from "./routes/index";
import { authenticate } from "./middlewares/auth";
import path from "path";
import corsMiddleware from "./middlewares/cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRoute);
app.use(authenticate);
app.use("/api/v1", indexRoute);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
