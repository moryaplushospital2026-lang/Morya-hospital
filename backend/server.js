import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import authRoutes from "./routes/auth.js";
import resourceRoutes from "./routes/resources.js";

dotenv.config({ override: true });

const app = express();
const port = process.env.PORT || 5001;
const host = process.env.HOST || "127.0.0.1";

const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  "http://127.0.0.1:5175",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`CORS blocked origin: ${origin}`));
    },
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("backend/uploads")));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/admin", authRoutes);
app.use("/api", resourceRoutes);

const frontendPath = path.resolve("dist");
const frontendIndex = path.join(frontendPath, "index.html");

if (fs.existsSync(frontendIndex)) {
  app.use(express.static(frontendPath));
  app.use((req, res, next) => {
    if (req.method === "GET" && req.accepts("html")) {
      res.sendFile(frontendIndex);
      return;
    }
    next();
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

const server = app.listen(port, host, () => {
  console.log(`Morya Plus backend running on http://${host}:${port}`);
});

server.on("error", (error) => {
  console.error("Backend failed to start:", error.message);
  process.exit(1);
});
