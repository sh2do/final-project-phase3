/**
 * Production-Ready Express Backend
 * Copy-Paste Ready with Full Error Handling & CORS
 */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ============= DATABASE SETUP =============
const dbPath = path.join(__dirname, "anime_collection.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
  console.log("✅ Connected to SQLite database");
  initializeDatabase();
});

// Enable foreign keys
db.run("PRAGMA foreign_keys = ON");

function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Anime table
    db.run(`
      CREATE TABLE IF NOT EXISTS anime (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        genre TEXT,
        image_url TEXT,
        mal_id INTEGER UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Collection Items table
    db.run(`
      CREATE TABLE IF NOT EXISTS collection_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        anime_id INTEGER NOT NULL,
        status TEXT DEFAULT 'watching',
        rating INTEGER,
        episodes_watched INTEGER DEFAULT 0,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(anime_id) REFERENCES anime(id),
        UNIQUE(user_id, anime_id)
      )
    `);

    console.log("📋 Database tables initialized");
  });
}

// Helper to run db queries with promises
function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

// ============= MIDDLEWARE =============

// Request logging
app.use(morgan("combined"));

// CORS - Allow specific origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", {
    message: err.message,
    stack: NODE_ENV === "development" ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  const statusCode = err.statusCode || 500;
  const message =
    NODE_ENV === "development" ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
    },
  });
};

// ============= ROUTES =============

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// -------- COLLECTION ENDPOINTS --------
app.get("/api/collection", async (req, res, next) => {
  try {
    const { user_id = 1 } = req.query;

    const items = await dbAll(
      `
      SELECT ci.*, a.title, a.description, a.image_url, a.genre
      FROM collection_items ci
      JOIN anime a ON ci.anime_id = a.id
      WHERE ci.user_id = ?
      ORDER BY ci.created_at DESC
      `,
      [user_id]
    );

    res.json(items);
  } catch (err) {
    next(err);
  }
});

app.get("/api/collection/:itemId", async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const item = await dbGet(
      `
      SELECT ci.*, a.title, a.description, a.image_url, a.genre
      FROM collection_items ci
      JOIN anime a ON ci.anime_id = a.id
      WHERE ci.id = ?
      `,
      [itemId]
    );

    if (!item) {
      return res.status(404).json({ error: "Collection item not found" });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
});

app.post("/api/collection", async (req, res, next) => {
  try {
    const {
      user_id = 1,
      anime_id,
      status = "watching",
      rating,
      episodes_watched = 0,
      notes,
    } = req.body;

    if (!anime_id) {
      return res.status(400).json({ error: "anime_id is required" });
    }

    const result = await dbRun(
      `
      INSERT INTO collection_items (user_id, anime_id, status, rating, episodes_watched, notes)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        anime_id,
        status,
        rating || null,
        episodes_watched,
        notes || null,
      ]
    );

    const newItem = await dbGet(
      `
      SELECT ci.*, a.title, a.description, a.image_url
      FROM collection_items ci
      JOIN anime a ON ci.anime_id = a.id
      WHERE ci.id = ?
      `,
      [result.lastID]
    );

    res.status(201).json(newItem);
  } catch (err) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(409).json({ error: "Anime already in collection" });
    }
    next(err);
  }
});

app.patch("/api/collection/:itemId", async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { status, rating, episodes_watched, notes } = req.body;

    // Check if item exists
    const item = await dbGet("SELECT id FROM collection_items WHERE id = ?", [
      itemId,
    ]);
    if (!item) {
      return res.status(404).json({ error: "Collection item not found" });
    }

    // Build update query dynamically
    const updates = [];
    const values = [];

    if (status !== undefined) {
      updates.push("status = ?");
      values.push(status);
    }
    if (rating !== undefined) {
      updates.push("rating = ?");
      values.push(rating);
    }
    if (episodes_watched !== undefined) {
      updates.push("episodes_watched = ?");
      values.push(episodes_watched);
    }
    if (notes !== undefined) {
      updates.push("notes = ?");
      values.push(notes);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(itemId);

    await dbRun(
      `UPDATE collection_items SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    const updated = await dbGet(
      `
      SELECT ci.*, a.title, a.description, a.image_url
      FROM collection_items ci
      JOIN anime a ON ci.anime_id = a.id
      WHERE ci.id = ?
      `,
      [itemId]
    );

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/collection/:itemId", async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const result = await dbRun("DELETE FROM collection_items WHERE id = ?", [
      itemId,
    ]);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Collection item not found" });
    }

    res.json({ status: "deleted", id: itemId });
  } catch (err) {
    next(err);
  }
});

// -------- ANIME ENDPOINTS --------
app.get("/api/anime", async (req, res, next) => {
  try {
    const { skip = 0, limit = 100 } = req.query;
    const offset = Math.max(0, parseInt(skip) || 0);
    const max = Math.min(parseInt(limit) || 100, 100);

    const items = await dbAll("SELECT * FROM anime LIMIT ? OFFSET ?", [
      max,
      offset,
    ]);

    res.json(items);
  } catch (err) {
    next(err);
  }
});

app.get("/api/anime/:animeId", async (req, res, next) => {
  try {
    const { animeId } = req.params;

    const item = await dbGet("SELECT * FROM anime WHERE id = ?", [animeId]);

    if (!item) {
      return res.status(404).json({ error: "Anime not found" });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
});

app.post("/api/anime", async (req, res, next) => {
  try {
    const { title, description, genre, image_url, mal_id } = req.body;

    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }

    const result = await dbRun(
      `
      INSERT INTO anime (title, description, genre, image_url, mal_id)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        title,
        description || null,
        genre || null,
        image_url || null,
        mal_id || null,
      ]
    );

    const newAnime = await dbGet("SELECT * FROM anime WHERE id = ?", [
      result.lastID,
    ]);

    res.status(201).json(newAnime);
  } catch (err) {
    next(err);
  }
});

// -------- USER ENDPOINTS --------
app.get("/api/users", async (req, res, next) => {
  try {
    const users = await dbAll(
      "SELECT id, username, email, created_at FROM users"
    );
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.get("/api/users/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await dbGet(
      "SELECT id, username, email, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});

// ============= 404 HANDLER =============
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.path} not found`,
    method: req.method,
  });
});

// ============= ERROR HANDLER =============
app.use(errorHandler);

// ============= START SERVER =============
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`
╔════════════════════════════════════════════╗
║   🚀 Anime Collection Tracker Server      ║
╠════════════════════════════════════════════╣
║  Server:   http://localhost:${PORT}              ║
║  Database: ${dbPath}
║  Mode:     ${NODE_ENV.toUpperCase()}              ║
║  CORS:     ${allowedOrigins.join(", ")}        ║
╚════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down gracefully...");
  server.close(() => {
    db.close();
    console.log("✅ Server closed");
    process.exit(0);
  });
});

module.exports = app;
