import { useParams, useNavigate } from "react-router-dom";
import { useSingleAnime } from "../hooks/useAnime";
import { collectionAPI } from "../services/api";
import { useState } from "react";

const AnimeDetailsPage = () => {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("1");
  const [message, setMessage] = useState("");
  const { anime, loading, error } = useSingleAnime(parseInt(animeId));

  const handleAddToCollection = async () => {
    if (!userId) {
      setMessage("Please enter a user ID");
      return;
    }

    try {
      await collectionAPI.add({
        user_id: parseInt(userId),
        anime_id: parseInt(animeId),
        episodes_watched: 0,
      });
      setMessage("Added to your collection!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessage("Failed to add to collection");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">Anime not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Image */}
            {anime.image_url && (
              <div className="md:col-span-1">
                <img
                  src={anime.image_url}
                  alt={anime.title}
                  className="w-full rounded-lg"
                />
              </div>
            )}

            {/* Details */}
            <div className={anime.image_url ? "md:col-span-2" : "col-span-1"}>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {anime.title}
              </h1>

              <div className="space-y-3 mb-6">
                <p className="text-gray-700">
                  <span className="font-semibold">Episodes:</span>{" "}
                  {anime.episodes}
                </p>
                {anime.release_year && (
                  <p className="text-gray-700">
                    <span className="font-semibold">Release Year:</span>{" "}
                    {anime.release_year}
                  </p>
                )}
              </div>

              {anime.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {anime.description}
                  </p>
                </div>
              )}

              {/* Add to Collection */}
              <div className="border-t pt-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your User ID
                  </label>
                  <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                {message && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
                    {message}
                  </div>
                )}

                <button
                  onClick={handleAddToCollection}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
                >
                  Add to My Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsPage;
