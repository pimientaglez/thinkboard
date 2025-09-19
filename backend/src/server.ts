import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes";
import { connectDB } from "./config/db";
import rateLimiter from "./middleware/rateLimiter";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_DB_URI =
  process.env.MONGO_DB_URI || "mongodb://localhost:27017/thinkboard";

if (!MONGO_DB_URI) {
  console.error("MONGO_DB_URI is not defined in environment variables");
  process.exit(1);
}

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // Enable CORS for frontend
app.use(express.json()); // for parsing application/json
app.use(rateLimiter); // Apply rate limiting middleware

// Routes
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Notes Server is running on http://localhost:${PORT}`);
  });
});
