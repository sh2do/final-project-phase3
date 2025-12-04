import { useState, useEffect } from "react";
import { collectionAPI } from "../services/api";

export const useUserCollection = (userId) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollection = async () => {
    if (!userId) {
      setError("User ID is required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log(`📥 Fetching collection for user ${userId}`);
      const response = await collectionAPI.getUserCollection(userId);
      setCollection(Array.isArray(response.data) ? response.data : []);
      console.log(`✅ Fetched ${response.data?.length || 0} items`);
    } catch (err) {
      const errorMsg = err.message || "Failed to fetch collection";
      setError(errorMsg);
      console.error("❌ Collection fetch error:", {
        message: errorMsg,
        status: err.response?.status,
        data: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, [userId]);

  const addToCollection = async (collectionData) => {
    try {
      console.log("📤 Adding to collection:", collectionData);
      const response = await collectionAPI.add(collectionData);
      setCollection([...collection, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      const errorMsg = err.message || "Failed to add to collection";
      setError(errorMsg);
      console.error("❌ Add error:", errorMsg);
      throw err;
    }
  };

  const removeFromCollection = async (itemId) => {
    try {
      console.log("🗑️ Removing item:", itemId);
      await collectionAPI.remove(itemId);
      setCollection(collection.filter((item) => item.id !== itemId));
      setError(null);
    } catch (err) {
      const errorMsg = err.message || "Failed to remove item";
      setError(errorMsg);
      console.error("❌ Remove error:", errorMsg);
      throw err;
    }
  };

  const updateCollectionItem = async (itemId, data) => {
    try {
      console.log("✏️ Updating item:", itemId, data);
      const response = await collectionAPI.update(itemId, data);
      setCollection(
        collection.map((item) => (item.id === itemId ? response.data : item))
      );
      setError(null);
      return response.data;
    } catch (err) {
      const errorMsg = err.message || "Failed to update item";
      setError(errorMsg);
      console.error("❌ Update error:", errorMsg);
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
