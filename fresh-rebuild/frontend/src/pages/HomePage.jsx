import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import { SearchBar } from "../components/SearchBar";
import { AnimeCard } from "../components/AnimeCard";
import { Toast } from "../components/Toast";
const API_URL = "http://localhost:5001/api";

export function HomePage() {
  const { results, loading, error, search } = useAnimeSearch();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 text-white py-8 shadow-lg border-b-4 border-purple-600">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-purple-400">
            🎬 Anime Tracker
          </h1>
          <p className="text-gray-300 mt-2">
            Discover and explore your favorite anime
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => navigate("/add")}
              className="bg-purple-600 text-white font-semibold px-4 py-2 rounded hover:bg-purple-700 transition shadow-lg"
            >
              + Add Anime
            </button>
            <button
              onClick={() => navigate("/collection")}
              className="bg-gray-700 text-purple-400 font-semibold px-4 py-2 rounded hover:bg-gray-600 transition shadow-lg border border-purple-600"
            >
              💾 Collection
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <SearchBar onSearch={search} />

        {error && (
          <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">⏳</div>
            <p className="text-gray-600 mt-2">Loading anime...</p>
          </div>
        )}

        {results.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {results.length === 0 && !error
                ? "Search for an anime to get started"
                : "No anime found"}
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                onClick={(id) => navigate(`/anime/${id}`)}
                onSave={async (item) => {
                  try {
                    const res = await fetch(`${API_URL}/collection`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ mal_id: item.mal_id }),
                    });
                    if (!res.ok) {
                      const err = await res.json();
                      throw new Error(err.error || "Failed to save");
                    }
                    setToast({
                      message: `✓ Saved: ${item.title}`,
                      type: "success",
                    });
                  } catch (err) {
                    setToast({
                      message: `✗ Save failed: ${err.message}`,
                      type: "error",
                    });
                  }
                }}
              />
            ))}
          </div>
        )}
      </main>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
