import express from "express";
import cors from 'cors';
import { router as orgsRouter } from "./router/orgs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use("/api/v1", orgsRouter);
app.get("/", async (req, res) => {
  res.json({ message: "Server is running" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
