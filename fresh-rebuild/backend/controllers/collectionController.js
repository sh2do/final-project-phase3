const {
  addToCollection,
  loadCollections,
} = require("../services/collectionService");
const { getMockAnimeById } = require("../services/mockAnime");

// Get saved collection
exports.getCollection = (req, res) => {
  try {
    const list = loadCollections();
    res.json({ data: list });
  } catch (err) {
    console.error("Collection fetch error:", err.message);
    res.status(500).json({ error: "Failed to load collection" });
  }
};

// Save anime to collection. Expect body to contain either full anime object or { mal_id }
exports.saveAnime = (req, res) => {
  try {
    const payload = req.body;
    if (!payload) return res.status(400).json({ error: "Missing payload" });

    let anime = payload;
    if (payload.mal_id && !payload.title) {
      // try to find in mock db
      anime = getMockAnimeById(payload.mal_id);
      if (!anime)
        return res.status(404).json({ error: "Anime not found to save" });
    }

    const saved = addToCollection(anime);
    res.status(201).json({ data: saved });
  } catch (err) {
    console.error("Save collection error:", err.message);
    res.status(500).json({ error: "Failed to save anime" });
  }
};
