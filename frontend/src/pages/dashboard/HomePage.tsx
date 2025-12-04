import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { animeService } from '../../api';
import { Anime } from '../../types/api';
import { Link } from 'react-router-dom';
import AnimeCard from '../../features/anime/components/AnimeCard'; // Will create this

const HomePage: React.FC = () => {
  const { isLoggedIn, user } = useAuthStore();
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        // Assuming search with empty query returns trending or popular
        const response = await animeService.searchExternalAnime('', 1, 12); // Fetch 12 trending/popular items
        setTrendingAnime(response);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to fetch trending anime.');
        console.error('Fetch trending anime error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        {isLoggedIn ? `Welcome back, ${user?.username || user?.email}!` : 'Welcome to Anime Tracker'}
      </h1>

      <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12">
        Track your favorite anime, discover new ones, and manage your collection.
      </p>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Trending Anime</h2>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => ( // Placeholder for loading skeleton
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && trendingAnime.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingAnime.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
        {!loading && !error && trendingAnime.length === 0 && (
          <p className="text-center text-gray-500">No trending anime found.</p>
        )}
      </section>

      {!isLoggedIn && (
        <section className="text-center mt-12 p-8 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-lg mb-6">
            Sign up now to start tracking your anime, create personalized lists, and discover new shows!
          </p>
          <Link
            to="/auth/register"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </section>
      )}
    </div>
  );
};

export default HomePage;
