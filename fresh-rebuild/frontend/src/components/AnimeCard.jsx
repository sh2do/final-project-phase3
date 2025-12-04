export function AnimeCard({ anime, onClick, onSave }) {
  const { mal_id, images, title, type, episodes } = anime;

  return (
    <div className="relative">
      <div
        onClick={() => onClick && onClick(mal_id)}
        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      >
        <div className="h-64 overflow-hidden bg-gray-200">
          <img
            src={images?.jpg?.image_url || "/placeholder.jpg"}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 text-gray-900">
            {title}
          </h3>

          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-medium">Type:</span> {type || "N/A"}
            </p>
            <p>
              <span className="font-medium">Episodes:</span> {episodes || "?"}
            </p>
          </div>
        </div>
      </div>

      {onSave && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(anime);
          }}
          className="absolute top-2 right-2 bg-white/90 text-sm px-2 py-1 rounded shadow"
        >
          Save
        </button>
      )}
    </div>
  );
}
