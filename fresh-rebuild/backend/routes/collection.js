const express = require("express");
const {
  getCollection,
  saveAnime,
} = require("../controllers/collectionController");

const router = express.Router();

// GET /api/collection
router.get("/", getCollection);

// POST /api/collection
router.post("/", saveAnime);

module.exports = router;
