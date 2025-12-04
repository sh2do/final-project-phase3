const express = require("express");
const { searchAnime, getAnimeById } = require("../controllers/animeController");

const router = express.Router();

// GET /api/anime?q=search_term
router.get("/anime", searchAnime);

// GET /api/anime/:id
router.get("/anime/:id", getAnimeById);

module.exports = router;
