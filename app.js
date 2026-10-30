import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { eventRouter } from "./src/routes/event.routes.js";
import { categoryRouter } from "./src/routes/category.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// rutas
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", eventRouter);
app.use("/api", categoryRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor en puerto ${PORT}`);
});
