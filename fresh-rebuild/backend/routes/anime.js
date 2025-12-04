const express = require("express");
const {
  searchAnime,
  getAnimeById,
  addCustomAnime,
} = require("../controllers/animeController");

const router = express.Router();

// GET /api/anime?q=search_term
router.get("/anime", searchAnime);

// GET /api/anime/:id
router.get("/anime/:id", getAnimeById);

// POST /api/anime - add custom anime
router.post("/anime", addCustomAnime);

module.exports = router;
