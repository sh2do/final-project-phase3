import React from 'react';
import { CollectionItem } from '../../../types/api';
import { Link } from 'react-router-dom';

interface CollectionItemCardProps {
  item: CollectionItem;
  onEdit: (item: CollectionItem) => void;
  onDelete: (itemId: number) => void;
}

const CollectionItemCard: React.FC<CollectionItemCardProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <Link to={`/anime/${item.anime?.id}`} className="block">
        {item.anime?.image_url ? (
          <img
            src={item.anime.image_url}
            alt={item.anime.title}
            className="w-full h-48 object-cover object-center"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No Image
          </div>
        )}
      </Link>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2 line-clamp-2">
            <Link to={`/anime/${item.anime?.id}`}>{item.anime?.title || 'Unknown Anime'}</Link>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Watched: {item.episodes_watched} episodes</p>
          {item.rating !== undefined && item.rating !== null && (
            <p className="text-sm text-gray-600 dark:text-gray-400">Rating: {item.rating}/10</p>
          )}
          {item.is_favorite && (
            <span className="inline-block bg-pink-200 text-pink-800 text-xs px-2 py-1 rounded-full mt-1">Favorite</span>
          )}
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold py-2 px-3 rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-3 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionItemCard;
