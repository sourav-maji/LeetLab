import express from "express";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ message: "Hello Guys welcome to LeetLab 🔥🔥🔥" });
});

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
