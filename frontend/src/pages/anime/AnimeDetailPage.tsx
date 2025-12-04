import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { animeService, collectionService } from '../../api';
import { Anime, CollectionItemCreate } from '../../types/api';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';

const AnimeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuthStore();
  const { setError } = useUiStore();
  
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const fetchedAnime = await animeService.getAnimeById(parseInt(id));
        setAnime(fetchedAnime);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to fetch anime details.');
        console.error('Fetch anime details error:', err);
        // Optionally redirect to a 404 page or previous page
        navigate('/anime/search'); 
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, [id, navigate, setError]);

  const handleSaveToCollection = async () => {
    if (!user || !anime) {
      setError('You must be logged in to add anime to your collection.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const collectionItem: CollectionItemCreate = {
        user_id: user.id,
        anime_id: anime.id,
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


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!anime) {
    return <div className="text-center text-red-500 text-xl">Anime not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8">
      <div className="md:flex md:space-x-8">
        <div className="md:w-1/3">
          {anime.image_url ? (
            <img
              src={anime.image_url}
              alt={anime.title}
              className="w-full rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-xl rounded-lg">
              No Image
            </div>
          )}
        </div>
        <div className="md:w-2/3 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
          {anime.release_year && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              <strong>Release Year:</strong> {anime.release_year}
            </p>
          )}
          {anime.episodes && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              <strong>Episodes:</strong> {anime.episodes}
            </p>
          )}
          {anime.score && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
              <strong>Score:</strong> {anime.score}/100
            </p>
          )}
          {anime.source && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              <strong>Source:</strong> {anime.source.charAt(0).toUpperCase() + anime.source.slice(1)}
            </p>
          )}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {anime.synopsis || 'No synopsis available.'}
          </p>

          {isLoggedIn && (
            <button
              onClick={handleSaveToCollection}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
            >
              Add to My Collection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage;
