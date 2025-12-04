const express = require("express");
const cors = require("cors");
require("dotenv").config();

const animeRoutes = require("./routes/anime");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", animeRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  const apiMode =
    process.env.USE_MOCK_API !== "false"
      ? "⚡ MOCK API (FAST)"
      : "🌐 JIKAN API (REAL)";
  console.log(`\n🚀 Backend running at http://localhost:${PORT}`);
  console.log(`📍 API: ${apiMode}`);
  console.log(`🌐 Frontend: http://localhost:5173\n`);
});
