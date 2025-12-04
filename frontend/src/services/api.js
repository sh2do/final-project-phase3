import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

console.log("🔗 API Base URL:", API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor - attach auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error(
        `❌ HTTP ${error.response.status}:`,
        error.response.data
      );
      error.message = error.response.data?.detail || `HTTP ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // Request made but no response
      console.error(
        "❌ No response from server. Check if backend is running:",
        API_BASE_URL
      );
      error.message = `Network Error: Cannot reach ${API_BASE_URL}. Is the backend running?`;
    } else {
      // Error in request setup
      console.error("❌ Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

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

// Collection endpoints - FIXED ROUTE
export const collectionAPI = {
  getUserCollection: (userId, skip = 0, limit = 100) =>
    apiClient.get(`/anime/collection/`, { params: { user_id: userId, skip, limit } }),

  getItem: (itemId) => apiClient.get(`/anime/collection/item/${itemId}`),

  add: (collectionData) => apiClient.post("/anime/collection/add", collectionData),

  update: (itemId, collectionData) =>
    apiClient.patch(`/anime/collection/${itemId}`, collectionData),

  remove: (itemId) => apiClient.delete(`/anime/collection/${itemId}`),
};

export default apiClient;
