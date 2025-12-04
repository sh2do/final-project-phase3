const axios = require('axios');

const JIKAN_API = process.env.JIKAN_API || 'https://api.jikan.moe/v4';

// Search anime by query
async function searchAnime(query, page = 1) {
  try {
    const response = await axios.get(`${JIKAN_API}/anime`, {
      params: {
        query,
        page,
        limit: 25,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Jikan API error:', error.message);
    throw new Error('Failed to fetch anime data');
  }
}

// Get anime by ID
async function getAnimeById(id) {
  try {
    const response = await axios.get(`${JIKAN_API}/anime/${id}`);
    return response.data;
  } catch (error) {
    console.error('Jikan API error:', error.message);
    throw new Error('Failed to fetch anime details');
  }
}

module.exports = {
  searchAnime,
  getAnimeById,
};
