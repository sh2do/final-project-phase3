import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

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
        const response = await fetch(`${API_URL}/anime/${id}`);
        if (!response.ok) throw new Error('Failed to fetch anime details');

        const data = await response.json();
        setAnime(data.data);
      } catch (err) {
        setError(err.message);
        console.error('Detail error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  return { anime, loading, error };
}
