import { useNavigate } from "react-router-dom";
import { useAnimeSearch } from "../hooks/useAnimeSearch";
import { SearchBar } from "../components/SearchBar";
import { AnimeCard } from "../components/AnimeCard";

export function HomePage() {
  const { results, loading, error, search } = useAnimeSearch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold">🎬 Anime Tracker</h1>
          <p className="text-blue-100 mt-1">
            Discover and explore your favorite anime
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <SearchBar onSearch={search} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
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
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
