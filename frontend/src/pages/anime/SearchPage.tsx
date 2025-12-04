import React, { useState } from 'react';
import { animeService, collectionService } from '../../api';
import { Anime, CollectionItemCreate } from '../../types/api';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import AnimeCard from '../../features/anime/components/AnimeCard';


const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Anime[]>([]);
  const { user, isLoggedIn } = useAuthStore();
  const { isLoading, setLoading, setError } = useUiStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await animeService.searchExternalAnime(query);
      setResults(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to search for anime.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToCollection = async (anime: Anime) => {
    if (!user) {
      setError('You must be logged in to add anime to your collection.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // First, ensure the anime is saved in our local DB if not already
      let savedAnime = anime;
      if (!anime.id) { // If it's an external anime without our local DB ID
        savedAnime = await animeService.saveExternalAnime(anime.external_id!); // external_id should be present
      }

      const collectionItem: CollectionItemCreate = {
        user_id: user.id,
        anime_id: savedAnime.id,
        episodes_watched: 0,
        is_favorite: false,
      };
      await collectionService.createCollectionItem(collectionItem);
      alert(`${anime.title} added to your collection!`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to add anime to collection.');
      console.error('Save to collection error:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Search Anime</h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          className="w-full max-w-md p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          placeholder="Search by anime title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-lg transition-colors"
          disabled={isLoading}
        >
          Search
        </button>
      </form>

      {isLoading && <p className="text-center text-blue-500">Searching...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((anime) => (
            <div key={anime.id || anime.external_id} className="relative">
              <AnimeCard anime={anime} />
              {isLoggedIn && (
                <button
                  onClick={() => handleSaveToCollection(anime)}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded-full transition-colors whitespace-nowrap"
                >
                  Add to Collection
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {!isLoading && !error && results.length === 0 && query.trim() && (
        <p className="text-center text-gray-500">No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchPage;
