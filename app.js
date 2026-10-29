import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// rutas

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor en puerto ${PORT}`);
});
