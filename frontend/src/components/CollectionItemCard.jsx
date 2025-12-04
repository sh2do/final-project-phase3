import PropTypes from "prop-types";

const CollectionItemCard = ({ item, onUpdate, onRemove }) => {
  const handleEpisodesChange = (e) => {
    onUpdate(item.id, { episodes_watched: parseInt(e.target.value) });
  };

  const handleRatingChange = (e) => {
    onUpdate(item.id, { rating: parseFloat(e.target.value) });
  };

  const handleFavoriteToggle = () => {
    onUpdate(item.id, { is_favorite: item.is_favorite ? 0 : 1 });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {item.anime?.title || "Unknown Anime"}
          </h3>
          <p className="text-sm text-gray-600">
            Total Episodes: {item.anime?.episodes || 0}
          </p>
        </div>
        <button
          onClick={() => handleFavoriteToggle()}
          className={`text-2xl ${
            item.is_favorite ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-400`}
        >
          ★
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Episodes Watched
          </label>
          <input
            type="number"
            value={item.episodes_watched}
            onChange={handleEpisodesChange}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating (0-10)
          </label>
          <input
            type="number"
            value={item.rating || ""}
            onChange={handleRatingChange}
            min="0"
            max="10"
            step="0.1"
            placeholder="N/A"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          />
        </div>
      </div>

      {item.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
            {item.notes}
          </p>
        </div>
      )}

      <button
        onClick={() => onRemove(item.id)}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition-colors"
      >
        Remove from Collection
      </button>
    </div>
  );
};

CollectionItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    anime_id: PropTypes.number.isRequired,
    episodes_watched: PropTypes.number.isRequired,
    rating: PropTypes.number,
    notes: PropTypes.string,
    is_favorite: PropTypes.number.isRequired,
    anime: PropTypes.shape({
      title: PropTypes.string,
      episodes: PropTypes.number,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CollectionItemCard;
