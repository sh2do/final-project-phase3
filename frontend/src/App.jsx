import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimeCard from './components/AnimeCard';
import SkeletonCard from './components/SkeletonCard';
import Alert from './components/Alert';
import { searchAnimeJikan, saveAnimeToCollection, getLocalAnimeCollection, updateLocalAnime, deleteLocalAnime } from './services/jikanApi';

// A simple debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [animeResults, setAnimeResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // For success messages
  const [localCollection, setLocalCollection] = useState([]); // To keep track of what's in local collection
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounce search by 500ms

  // --- Fetching Local Collection on Load ---
  const fetchLocalCollection = useCallback(async () => {
    try {
      const data = await getLocalAnimeCollection();
      setLocalCollection(data.map(item => item.mal_id)); // Store only mal_ids for quick lookup
    } catch (err) {
      console.error("Failed to fetch local collection for checking:", err);
      // It's okay if this fails, main app functionality is search
    }
  }, []);

  useEffect(() => {
    fetchLocalCollection();
  }, [fetchLocalCollection]);

  // --- Jikan Anime Search Effect ---
  useEffect(() => {
    const fetchAnime = async () => {
      if (!debouncedSearchQuery) {
        setAnimeResults([]);
        return;
      }

      setLoading(true);
      setError(null);
      setMessage(null);

      try {
        const data = await searchAnimeJikan(debouncedSearchQuery);
        setAnimeResults(data);
        if (data.length === 0) {
          setMessage("No anime found for your search.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch anime from Jikan API.");
        setAnimeResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [debouncedSearchQuery]);

  // --- Handlers for Local Collection Actions (passed to AnimeCard) ---

  const handleSaveAnime = async (animeData, status) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      const savedAnime = await saveAnimeToCollection(animeData, status);
      setMessage(`"${savedAnime.title}" added to your collection!`);
      fetchLocalCollection(); // Refresh local collection status
    } catch (err) {
      setError(err.message || 'Failed to save anime to collection.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocalAnime = async (animeId, updateData) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      const updatedAnime = await updateLocalAnime(animeId, updateData);
      setMessage(`"${updatedAnime.title}" updated successfully!`);
      fetchLocalCollection(); // Refresh local collection status (though not strictly needed for this action)
    } catch (err) {
      setError(err.message || 'Failed to update anime in collection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLocalAnime = async (animeId) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      await deleteLocalAnime(animeId);
      setMessage('Anime deleted from collection!');
      fetchLocalCollection(); // Refresh local collection status
    } catch (err) {
      setError(err.message || 'Failed to delete anime from collection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Explore Anime</h1>
          <p className="text-xl text-gray-600">Search for your favorite anime and manage your collection.</p>
        </header>

        {/* Search Bar */}
        <section className="mb-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Anime Search</h2>
          <input
            type="text"
            placeholder="Search for an anime..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        {/* Messages and Alerts */}
        <section className="mb-8">
          {error && <Alert message={error} type="error" onClose={() => setError(null)} />}
          {message && <Alert message={message} type="success" onClose={() => setMessage(null)} />}
        </section>

        {/* Anime Results Grid */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {animeResults.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  anime={anime}
                  onSave={handleSaveAnime}
                  // isLocalCollection is false for search results
                  // Check if this anime is already in the local collection (by mal_id)
                  // This is a simple indicator, actual local collection items are fetched separately
                  // If you want to show a button to 'Update Status' directly here, you'd need the local ID.
                />
              ))}
            </div>
          )}
        </section>

        {/* Local Collection Display (optional, can be moved to a separate page if needed) */}
        {/*
        <section className="mt-16 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Your Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {localCollection.map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                isLocalCollection={true}
                onUpdate={handleUpdateLocalAnime}
                onDelete={handleDeleteLocalAnime}
              />
            ))}
          </div>
          {localCollection.length === 0 && !loading && (
            <p className="text-center text-gray-600">Your local collection is empty.</p>
          )}
        </section>
        */}
      </main>

      <Footer />
    </div>
  );
}

export default App;