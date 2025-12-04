import { useState, useCallback } from 'react';

const API_URL = 'http://localhost:5000/api';

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
      const response = await fetch(`${API_URL}/anime?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch anime');

      const data = await response.json();
      setResults(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}
