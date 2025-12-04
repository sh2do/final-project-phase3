import { useState, useCallback } from "react";

const API_URL = "http://localhost:5001/api";

export function useAnimeSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`🔍 Frontend: Searching for "${query}"`);
      const url = `${API_URL}/anime?q=${encodeURIComponent(query)}`;
      console.log(`📡 Fetching from: ${url}`);

      const response = await fetch(url);
      console.log(`📥 Response status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Got ${data.data?.length || 0} results`);
      setResults(data.data || []);

      if (!data.data || data.data.length === 0) {
        setError("No anime found. Try a different search.");
      }
    } catch (err) {
      console.error("❌ Search error:", err);
      setError(`Failed to fetch: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}
