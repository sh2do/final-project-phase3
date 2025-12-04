import PropTypes from "prop-types";

const AnimeCard = ({ anime, onAddToCollection }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {anime.image_url && (
        <img
          src={anime.image_url}
          alt={anime.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {anime.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {anime.release_year || "N/A"}
        </p>
        <p className="text-sm text-gray-700 mb-4">{anime.episodes} episodes</p>
        {anime.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {anime.description}
          </p>
        )}
        <button
          onClick={() => onAddToCollection(anime)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
        >
          Add to Collection
        </button>
      </div>
    </div>
  );
};

AnimeCard.propTypes = {
  anime: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image_url: PropTypes.string,
    episodes: PropTypes.number.isRequired,
    release_year: PropTypes.number,
  }).isRequired,
  onAddToCollection: PropTypes.func.isRequired,
};

export default AnimeCard;
