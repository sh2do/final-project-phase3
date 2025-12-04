import { useState, useEffect } from "react";
import { animeAPI } from "../services/api";

export const useAnime = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnime = async (skip = 0, limit = 100) => {
    setLoading(true);
    try {
      const response = await animeAPI.getAll(skip, limit);
      setAnime(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching anime:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  return { anime, loading, error, refetch: fetchAnime };
};

export const useSingleAnime = (animeId) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!animeId) return;

    const fetchAnime = async () => {
      setLoading(true);
      try {
        const response = await animeAPI.getById(animeId);
        setAnime(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching anime:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [animeId]);

  return { anime, loading, error };
};
