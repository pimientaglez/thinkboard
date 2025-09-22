import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes";
import { connectDB } from "./config/db";
import rateLimiter from "./middleware/rateLimiter";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

const MONGO_DB_URI =
  process.env.MONGO_DB_URI || "mongodb://localhost:27017/thinkboard";

if (!MONGO_DB_URI) {
  console.error("MONGO_DB_URI is not defined in environment variables");
  process.exit(1);
}

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" })); // Enable CORS for frontend
}

app.use(express.json()); // for parsing application/json
app.use(rateLimiter); // Apply rate limiting middleware

// Routes
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "/dist", "/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Notes Server is running on http://localhost:${PORT}`);
  });
});
