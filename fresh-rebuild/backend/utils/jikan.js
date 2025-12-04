const axios = require("axios");

const JIKAN_API = process.env.JIKAN_API || "https://api.jikan.moe/v4";

// Add retry logic for API calls
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "User-Agent": "AnimeTracker/1.0",
  },
});

// Search anime by query
async function searchAnime(query, page = 1) {
  try {
    console.log(`🔍 Searching for: ${query} (page ${page})`);
    const response = await axiosInstance.get(`${JIKAN_API}/anime`, {
      params: {
        query,
        page,
        limit: 25,
        order_by: "score",
        sort: "desc",
      },
    });
    console.log(`✅ Found ${response.data.data?.length || 0} results`);
    return response.data;
  } catch (error) {
    console.error("❌ Jikan API error:", error.message);
    console.error("Full error:", error.response?.data || error);
    throw new Error(`API Error: ${error.response?.status || error.message}`);
  }
}

// Get anime by ID
async function getAnimeById(id) {
  try {
    console.log(`🎬 Fetching anime details for ID: ${id}`);
    const response = await axiosInstance.get(`${JIKAN_API}/anime/${id}`);
    console.log(`✅ Got details for: ${response.data.data?.title}`);
    return response.data;
  } catch (error) {
    console.error("❌ Jikan API error:", error.message);
    console.error("Full error:", error.response?.data || error);
    throw new Error(`API Error: ${error.response?.status || error.message}`);
  }
}

module.exports = {
  searchAnime,
  getAnimeById,
};
