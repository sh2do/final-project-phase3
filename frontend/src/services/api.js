import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Anime endpoints
export const animeAPI = {
  getAll: (skip = 0, limit = 100) =>
    apiClient.get("/anime", { params: { skip, limit } }),

  getById: (animeId) => apiClient.get(`/anime/${animeId}`),

  create: (animeData) => apiClient.post("/anime", animeData),

  update: (animeId, animeData) =>
    apiClient.patch(`/anime/${animeId}`, animeData),

  delete: (animeId) => apiClient.delete(`/anime/${animeId}`),

  // AniList API endpoints
  searchAniList: (query, page = 1) =>
    apiClient.get("/api/anilist/search", {
      params: { q: query, page, per_page: 10 },
    }),

  getTrendingAnime: (page = 1) =>
    apiClient.get("/api/anilist/trending", { params: { page, per_page: 10 } }),

  getAniListAnime: (anilistId) => apiClient.get(`/api/anilist/${anilistId}`),

  saveAniListAnime: (anilistId) =>
    apiClient.post(`/api/anilist/save/${anilistId}`),
};

// User endpoints
export const userAPI = {
  getAll: (skip = 0, limit = 100) =>
    apiClient.get("/users", { params: { skip, limit } }),

  getById: (userId) => apiClient.get(`/users/${userId}`),

  create: (userData) => apiClient.post("/users", userData),

  update: (userId, userData) => apiClient.patch(`/users/${userId}`, userData),

  delete: (userId) => apiClient.delete(`/users/${userId}`),
};

// Collection endpoints
export const collectionAPI = {
  getUserCollection: (userId, skip = 0, limit = 100) =>
    apiClient.get(`/collection/${userId}`, { params: { skip, limit } }),

  getItem: (itemId) => apiClient.get(`/collection/item/${itemId}`),

  add: (collectionData) => apiClient.post("/collection", collectionData),

  update: (itemId, collectionData) =>
    apiClient.patch(`/collection/${itemId}`, collectionData),

  remove: (itemId) => apiClient.delete(`/collection/${itemId}`),
};

export default apiClient;
