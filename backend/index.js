import express from "express";
import cors from "cors";

import "dotenv/config";
import router from "./api/comments.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://assignment-anchors-frontend.vercel.app"],
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json());

// Routes
app.use("/api/comments", router);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
