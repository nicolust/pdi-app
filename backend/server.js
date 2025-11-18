import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import router from "./routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// API Routes
app.use("/api", router);

// Serve frontend build from /public
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Azure injects PORT=80
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Backend running on port ${port}`)
);
