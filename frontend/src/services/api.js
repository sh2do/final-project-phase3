const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

/**
 * Fetches data from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of data items.
 * @throws {Error} If the API call fails.
 */
export const fetchData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/data`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
