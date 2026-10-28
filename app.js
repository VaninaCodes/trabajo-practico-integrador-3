import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";

dotenv.config();
const app = express();
app.use(express.json());

// rutas

const PORT = process.env.PORT || 3000;
await startDB();
app.listen(PORT, ()=> console.log(`Servidor en puerto ${PORT}`));