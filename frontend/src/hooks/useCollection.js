import { useState, useEffect } from "react";
import { collectionAPI } from "../services/api";

export const useUserCollection = (userId) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollection = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await collectionAPI.getUserCollection(userId);
      setCollection(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching collection:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, [userId]);

  const addToCollection = async (collectionData) => {
    try {
      const response = await collectionAPI.add(collectionData);
      setCollection([...collection, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeFromCollection = async (itemId) => {
    try {
      await collectionAPI.remove(itemId);
      setCollection(collection.filter((item) => item.id !== itemId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateCollectionItem = async (itemId, data) => {
    try {
      const response = await collectionAPI.update(itemId, data);
      setCollection(
        collection.map((item) => (item.id === itemId ? response.data : item))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    collection,
    loading,
    error,
    addToCollection,
    removeFromCollection,
    updateCollectionItem,
    refetch: fetchCollection,
  };
};
