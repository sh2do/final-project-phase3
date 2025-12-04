import React from 'react';

const AnimeCard = ({ anime, onSave, onUpdate, onDelete, isLocalCollection = false }) => {
  // Determine image URL, falling back to a placeholder
  const imageUrl = anime.image_url ||
                   (anime.images && anime.images.webp && anime.images.webp.large_image_url) ||
                   (anime.images && anime.images.jpg && anime.images.jpg.large_image_url) ||
                   'https://via.placeholder.com/150x200?text=No+Image';

  const handleSaveClick = () => {
    // When saving from search results, default status to "plan_to_watch"
    if (onSave) {
      onSave(anime, "plan_to_watch");
    }
  };

  const handleStatusUpdate = (newStatus) => {
    if (onUpdate) {
      onUpdate(anime.id, { user_list_status: newStatus });
    }
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(anime.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1">
      {/* Anime Image */}
      <img
        src={imageUrl}
        alt={anime.title}
        className="w-full h-56 object-cover object-center"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150x200?text=Image+Not+Found'; }}
      />

      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex-grow">{anime.title}</h3>

        {/* Score and Episodes */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          {anime.score && <span className="flex items-center">⭐ {anime.score}</span>}
          {anime.episodes && <span>{anime.episodes} episodes</span>}
        </div>

        {/* Synopsis (truncated) */}
        {anime.synopsis && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
            {anime.synopsis}
          </p>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-2 flex flex-wrap justify-center gap-2">
          {isLocalCollection ? (
            <>
              {/* If in local collection, show update/delete options */}
              <select
                className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={anime.user_list ? anime.user_list.status : ""}
                onChange={(e) => handleStatusUpdate(e.target.value)}
              >
                <option value="">No List</option>
                <option value="watching">Watching</option>
                <option value="completed">Completed</option>
                <option value="plan_to_watch">Plan to Watch</option>
              </select>
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-md transition-colors"
              >
                Delete
              </button>
            </>
          ) : (
            // If from search results, show save button
            <button
              onClick={handleSaveClick}
              className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md transition-colors w-full"
            >
              Add to Collection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;