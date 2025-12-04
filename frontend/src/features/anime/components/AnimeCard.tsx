import React from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../../types/api';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        {anime.image_url ? (
          <img
            src={anime.image_url}
            alt={anime.title}
            className="w-full h-48 object-cover object-center"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No Image
          </div>
        )}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2 line-clamp-2">{anime.title}</h3>
            {anime.release_year && (
              <p className="text-sm text-gray-600 dark:text-gray-400">Released: {anime.release_year}</p>
            )}
            {anime.score && (
              <p className="text-sm text-gray-600 dark:text-gray-400">Score: {anime.score}/100</p>
            )}
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
