import { useState, useCallback } from "react";

const API_URL = "http://localhost:5001/api";

export function useCollection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/collection`);
      if (!res.ok) throw new Error("Failed to fetch collection");
      const data = await res.json();
      setItems(data.data || []);
    } catch (err) {
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const add = useCallback(async (anime) => {
    try {
      const res = await fetch(`${API_URL}/collection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mal_id: anime.mal_id }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const data = await res.json();
      setItems((prev) => [data.data, ...prev]);
      return data.data;
    } catch (err) {
      throw err;
    }
  }, []);

  return { items, loading, error, fetch, add };
}
