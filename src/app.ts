import express from "express";
import router from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use("/api/v1", router);

// global error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});