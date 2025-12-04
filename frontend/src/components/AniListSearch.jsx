import { useState } from "react";
import { animeAPI } from "../services/api";

export default function AniListSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e, page = 1) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await animeAPI.searchAniList(searchQuery, page);
      setResults(response.data.media || []);
      setPageInfo(response.data.pageInfo || {});
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to search anime. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnime = async (anilistId, title) => {
    try {
      setLoading(true);
      await animeAPI.saveAniListAnime(anilistId);
      setError("");
      alert(`"${title}" saved to your collection!`);
    } catch (err) {
      setError(
        "Failed to save anime. It might already exist in your collection."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Search AniList</h1>
        <p className="text-gray-300 mb-8">
          Search for anime from AniList's database and save them to your
          collection
        </p>

        <form onSubmit={(e) => handleSearch(e, 1)} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for an anime..."
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {results.map((anime) => (
                <div
                  key={anime.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="aspect-video bg-gray-700 overflow-hidden">
                    {anime.coverImage?.large && (
                      <img
                        src={anime.coverImage.large}
                        alt={anime.title?.english || anime.title?.romaji}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-2 line-clamp-2">
                      {anime.title?.english || anime.title?.romaji || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {anime.episodes
                        ? `${anime.episodes} episodes`
                        : "Ongoing"}{" "}
                      • {anime.seasonYear || "TBA"}
                    </p>
                    <div className="flex gap-2 mb-3">
                      {anime.genres?.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="text-xs bg-purple-700 text-white px-2 py-1 rounded"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    {anime.averageScore && (
                      <p className="text-sm text-yellow-400 mb-3">
                        ⭐ {anime.averageScore / 10}
                      </p>
                    )}
                    <button
                      onClick={() =>
                        handleSaveAnime(
                          anime.id,
                          anime.title?.english || anime.title?.romaji
                        )
                      }
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition"
                    >
                      Add to Collection
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pageInfo && pageInfo.hasNextPage && (
              <div className="flex justify-center gap-2">
                {currentPage > 1 && (
                  <button
                    onClick={(e) => handleSearch(e, currentPage - 1)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                  >
                    Previous
                  </button>
                )}
                <span className="px-4 py-2 text-white">
                  Page {currentPage} of {pageInfo.lastPage}
                </span>
                {pageInfo.hasNextPage && (
                  <button
                    onClick={(e) => handleSearch(e, currentPage + 1)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {!loading && results.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No results found. Try a different search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
