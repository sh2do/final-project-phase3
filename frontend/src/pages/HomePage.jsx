import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnime } from "../hooks/useAnime";
import AnimeCard from "../components/AnimeCard";
import { collectionAPI } from "../services/api";

const HomePage = () => {
  const [userId, setUserId] = useState("1"); // Default user ID
  const [message, setMessage] = useState("");
  const { anime, loading, error } = useAnime();
  const navigate = useNavigate();

  const handleAddToCollection = async (selectedAnime) => {
    if (!userId) {
      setMessage("Please enter a user ID");
      return;
    }

    try {
      await collectionAPI.add({
        user_id: parseInt(userId),
        anime_id: selectedAnime.id,
        episodes_watched: 0,
      });
      setMessage(`${selectedAnime.title} added to your collection!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to add anime to collection");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Anime Collection Tracker
          </h1>
          <p className="text-gray-600">Browse and track your favorite anime</p>
        </div>

        {/* User Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your User ID
              </label>
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                placeholder="Enter user ID"
              />
            </div>
            <button
              onClick={() => navigate(`/collection/${userId}`)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition-colors"
            >
              View My Collection
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            Error: {error}
          </div>
        )}

        {/* Anime Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading anime...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {anime.map((animeItem) => (
              <AnimeCard
                key={animeItem.id}
                anime={animeItem}
                onAddToCollection={handleAddToCollection}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
