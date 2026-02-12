import express from "express";
import authRoutes from "./routes/auth.routes.js";
import "dotenv/config.js";
import { authorize, authMiddleware } from "./middleware/auth.middleware.js";
import cors from "cors";
const app = express();
const whiteList = ["http://localhost:5173"];

app.use(express.json());
app.use(
  cors({
    origin: whiteList,
  }),
);
app.use("/api/auth", authRoutes);
app.get("/", authMiddleware, authorize(["ADMIN", "MODERATOR"]), (req, res) =>
  res.send("Mon API fonctionne bien "),
);

export default app;
