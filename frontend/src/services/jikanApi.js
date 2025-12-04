const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

/**
 * Generic function to make API requests to the backend.
 * This is used for Jikan API calls that are proxied through our FastAPI backend.
 * @param {string} endpoint The API endpoint to call (e.g., "/jikan/search")
 * @param {string} method HTTP method (e.g., "GET")
 * @param {object} [params=null] Query parameters for GET requests
 * @returns {Promise<object>} The JSON response from the API
 * @throws {Error} If the API call fails or returns an error status
 */
const apiRequest = async (endpoint, method = 'GET', params = null) => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(url, options);
        const responseData = await response.json();

        if (!response.ok) {
            // FastAPI typically returns errors in a "detail" field
            throw new Error(responseData.detail || `API Error: ${response.status}`);
        }
        return responseData;
    } catch (error) {
        console.error(`Error during API request to ${url}:`, error);
        throw error;
    }
};

// --- Jikan API Endpoints (via Backend Proxy) ---

/**
 * Searches for anime using the Jikan API via our backend.
 * @param {string} query The search term for anime titles.
 * @returns {Promise<Array>} A promise that resolves to an array of anime search results.
 */
export const searchAnimeJikan = async (query) => {
    return apiRequest('/jikan/search', 'GET', { q: query });
};

/**
 * Saves an anime retrieved from Jikan API to the local collection via our backend.
 * @param {object} animeData The data of the anime to save.
 * @param {string} userListStatus The status to assign to the anime (e.g., "plan_to_watch").
 * @returns {Promise<object>} A promise that resolves to the saved anime object.
 */
export const saveAnimeToCollection = async (animeData, userListStatus = "plan_to_watch") => {
    return apiRequest('/jikan/save_to_collection', 'POST', {
        anime_data: animeData,
        user_list_status: userListStatus
    });
};

// --- Local Anime Collection Endpoints (for completeness if needed later, but not primary focus of this request) ---

export const getLocalAnimeCollection = async () => {
    return apiRequest('/anime', 'GET');
};

export const updateLocalAnime = async (id, animeData) => {
    return apiRequest(`/anime/${id}`, 'PUT', animeData);
};

export const deleteLocalAnime = async (id) => {
    return apiRequest(`/anime/${id}`, 'DELETE');
};