const { searchAnime, getAnimeById } = require("../utils/jikan");
const { searchMockAnime, getMockAnimeById } = require("../services/mockAnime");

// Toggle between mock (fast) and real (slow) API
// Set to true for instant results, false for real Jikan API
const USE_MOCK_API = process.env.USE_MOCK_API !== "false";

// Search anime
exports.searchAnime = async (req, res) => {
  try {
    const { q, page = 1 } = req.query;

    if (!q) {
      console.log("⚠️ Missing search query");
      return res.status(400).json({ error: "Search query is required" });
    }

    console.log(`📝 Controller: Searching for "${q}"`);
    
    let data;
    if (USE_MOCK_API) {
      console.log(`⚡ Using MOCK API (instant)`);
      const results = searchMockAnime(q);
      data = {
        data: results,
        pagination: { last_visible_page: 1, has_next_page: false }
      };
    } else {
      console.log(`🌐 Using JIKAN API (slower)`);
      data = await searchAnime(q, page);
    }
    
    console.log(`📤 Controller: Returning ${data.data?.length || 0} results`);
    res.json(data);
  } catch (error) {
    console.error("🚨 Search error:", error.message);
    res.status(500).json({ 
      error: error.message,
      details: "Check backend console for more info"
    });
  }
};

// Get anime by ID
exports.getAnimeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      console.log("⚠️ Missing anime ID");
      return res.status(400).json({ error: "Anime ID is required" });
    }

    console.log(`📝 Controller: Fetching anime ${id}`);
    
    let data;
    if (USE_MOCK_API) {
      console.log(`⚡ Using MOCK API (instant)`);
      const anime = getMockAnimeById(id);
      if (!anime) {
        return res.status(404).json({ error: "Anime not found" });
      }
      data = { data: anime };
    } else {
      console.log(`🌐 Using JIKAN API (slower)`);
      data = await getAnimeById(id);
    }
    
    console.log(`📤 Controller: Returning anime details`);
    res.json(data);
  } catch (error) {
    console.error("🚨 Detail error:", error.message);
    res.status(500).json({ 
      error: error.message,
      details: "Check backend console for more info"
    });
  }
};
