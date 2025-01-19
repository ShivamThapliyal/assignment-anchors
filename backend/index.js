import express from "express";
import cors from "cors";

import "dotenv/config";
import router from "./routes/comments.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// Routes
app.use("/api/comments", router);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
