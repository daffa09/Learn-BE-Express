// src/index.ts
import express from "express";
import authRoute from "./routes/auth";
import indexRoute from "./routes/index";
import { authenticate } from "./middlewares/auth";

const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use(authenticate);
app.use("/api/v1", indexRoute);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
