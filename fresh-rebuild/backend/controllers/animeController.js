const { searchAnime, getAnimeById } = require('../utils/jikan');

// Search anime
exports.searchAnime = async (req, res) => {
  try {
    const { q, page = 1 } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const data = await searchAnime(q, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get anime by ID
exports.getAnimeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Anime ID is required' });
    }

    const data = await getAnimeById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
