import React, { useState } from 'react';
import { searchAnimeJikan, saveAnimeToCollection } from '../services/api';
import AnimeCard from './AnimeCard';

const AnimeSearch = ({ onAnimeSaved }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setMessage('');
    setResults([]);

    try {
      const data = await searchAnimeJikan(query);
      if (data.length === 0) {
        setMessage('No results found.');
      }
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to search anime.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnime = async (animeData, status) => {
    try {
      setLoading(true);
      setError(null);
      const savedAnime = await saveAnimeToCollection(animeData, status);
      setMessage(`"${savedAnime.title}" added to collection!`);
      onAnimeSaved(); // Notify parent to refresh local collection
    } catch (err) {
      setError(err.message || 'Failed to save anime to collection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Search Anime</h2>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by anime title..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} onSave={handleSaveAnime} />
        ))}
      </div>
    </div>
  );
};

export default AnimeSearch;
