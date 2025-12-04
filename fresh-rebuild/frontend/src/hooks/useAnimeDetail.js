import { useState, useEffect } from "react";

const API_URL = "http://localhost:5001/api";

export function useAnimeDetail(id) {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAnime = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log(`🎬 Frontend: Fetching anime ${id}`);
        const url = `${API_URL}/anime/${id}`;
        const response = await fetch(url);
        console.log(`📥 Response status: ${response.status}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log(`✅ Got anime: ${data.data?.title}`);
        setAnime(data.data);
      } catch (err) {
        console.error("❌ Detail error:", err);
        setError(`Failed to fetch: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  return { anime, loading, error };
}
