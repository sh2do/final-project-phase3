import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { AnimeCard } from "../components/AnimeCard";

export function CollectionPage() {
  const navigate = useNavigate();
  const { items, loading, fetch } = useCollection();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-blue-100 mb-2"
          >
            ← Back to Search
          </button>
          <h1 className="text-4xl font-bold">💾 My Collection</h1>
          <p className="text-blue-100 mt-1">{items.length} anime saved</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12 text-gray-600">
            Loading collection...
          </div>
        )}

        {items.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No anime in your collection yet
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Start Adding
            </button>
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((anime) => (
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
