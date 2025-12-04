import React, { useState, useEffect } from 'react';
import { getLocalAnimeCollection, updateLocalAnime, deleteLocalAnime } from '../services/api';
import AnimeCard from './AnimeCard';

const LocalCollection = ({ refreshTrigger }) => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const fetchCollection = async () => {
    setLoading(true);
    setError(null);
    setMessage('');
    try {
      const data = await getLocalAnimeCollection();
      setCollection(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch local collection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

  const handleUpdateAnime = async (animeId, updateData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedAnime = await updateLocalAnime(animeId, updateData);
      setMessage(`"${updatedAnime.title}" updated successfully!`);
      fetchCollection(); // Refresh collection after update
    } catch (err) {
      setError(err.message || 'Failed to update anime.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnime = async (animeId) => {
    try {
      setLoading(true);
      setError(null);
      await deleteLocalAnime(animeId);
      setMessage('Anime deleted successfully!');
      fetchCollection(); // Refresh collection after deletion
    } catch (err) {
      setError(err.message || 'Failed to delete anime.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-700 text-lg">Loading your collection...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-center text-lg">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Local Collection</h2>
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      
      {collection.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your collection is empty. Search for anime to add!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              isLocalCollection={true}
              onDelete={handleDeleteAnime}
              onUpdate={handleUpdateAnime}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocalCollection;
