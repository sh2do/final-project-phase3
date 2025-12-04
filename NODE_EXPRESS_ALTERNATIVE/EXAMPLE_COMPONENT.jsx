// Example React component using the fixed API
import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function CollectionExample() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newAnimeId, setNewAnimeId] = useState("");

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("📥 Fetching collection...");
      const response = await api.get("/anime/collection/", {
        params: { user_id: 1 },
      });
      setItems(response.data);
      console.log("✅ Success:", response.data);
    } catch (err) {
      const errorMsg = err.message || "Failed to fetch collection";
      setError(errorMsg);
      console.error("❌ Error:", {
        message: errorMsg,
        status: err.response?.status,
        details: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnime = async (e) => {
    e.preventDefault();
    if (!newAnimeId) return;

    try {
      console.log("📤 Adding anime ID:", newAnimeId);
      const response = await api.post("/anime/collection/add", null, {
        params: {
          anime_id: newAnimeId,
          user_id: 1,
        },
      });
      setItems([...items, response.data]);
      setNewAnimeId("");
      console.log("✅ Added:", response.data);
    } catch (err) {
      setError(err.message);
      console.error("❌ Add failed:", err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      console.log("🗑️ Removing item:", itemId);
      await api.delete(`/anime/collection/${itemId}`);
      setItems(items.filter((item) => item.id !== itemId));
      console.log("✅ Removed");
    } catch (err) {
      setError(err.message);
      console.error("❌ Remove failed:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>My Anime Collection</h1>

      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "16px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "4px",
            color: "#c33",
          }}
        >
          ❌ Error: {error}
        </div>
      )}

      <form onSubmit={handleAddAnime} style={{ marginBottom: "20px" }}>
        <input
          type="number"
          value={newAnimeId}
          onChange={(e) => setNewAnimeId(e.target.value)}
          placeholder="Enter anime ID"
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add Anime
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && items.length === 0 && (
        <p style={{ color: "#666" }}>No anime in collection yet</p>
      )}

      {!loading && items.length > 0 && (
        <div>
          <p style={{ color: "#666" }}>{items.length} anime in collection</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: "12px",
                  marginBottom: "8px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>ID:</strong> {item.anime_id}
                  {item.title && (
                    <div>
                      <strong>Title:</strong> {item.title}
                    </div>
                  )}
                  {item.status && (
                    <div>
                      <strong>Status:</strong> {item.status}
                    </div>
                  )}
                  {item.rating && (
                    <div>
                      <strong>Rating:</strong> {item.rating}/10
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#f44",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
