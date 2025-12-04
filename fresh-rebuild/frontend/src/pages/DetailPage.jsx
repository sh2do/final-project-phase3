import { useParams, useNavigate } from "react-router-dom";
import { useAnimeDetail } from "../hooks/useAnimeDetail";

export function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { anime, loading, error } = useAnimeDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin text-4xl">⏳</div>
          <p className="text-gray-600 mt-2">Loading anime details...</p>
        </div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">
            ⚠️ {error || "Anime not found"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const {
    images,
    title,
    type,
    episodes,
    status,
    aired,
    score,
    synopsis,
    genres,
  } = anime;

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => navigate("/")}
        className="m-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Image */}
            <div className="md:col-span-1">
              <img
                src={images?.jpg?.image_url || "/placeholder.jpg"}
                alt={title}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            {/* Details */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 font-medium">Type</p>
                  <p className="text-lg text-gray-900">{type || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Episodes</p>
                  <p className="text-lg text-gray-900">{episodes || "?"}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Status</p>
                  <p className="text-lg text-gray-900">{status || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">Score</p>
                  <p className="text-lg text-gray-900">⭐ {score || "N/A"}</p>
                </div>
              </div>

              {aired?.string && (
                <div className="mb-6">
                  <p className="text-gray-600 font-medium">Aired</p>
                  <p className="text-gray-900">{aired.string}</p>
                </div>
              )}

              {genres && genres.length > 0 && (
                <div className="mb-6">
                  <p className="text-gray-600 font-medium mb-2">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Synopsis */}
          {synopsis && (
            <div className="bg-gray-50 px-8 py-6 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Synopsis
              </h2>
              <p className="text-gray-700 leading-relaxed">{synopsis}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
