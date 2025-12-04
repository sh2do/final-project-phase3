import React, { useEffect, useState } from 'react';
import { collectionService } from '../../api';
import { CollectionItem, CollectionItemUpdate } from '../../types/api';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';
import CollectionItemCard from '../../features/collection/components/CollectionItemCard'; // Will create this


const MyCollectionPage: React.FC = () => {
  const { user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const { setError, clearError } = useUiStore();

  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<CollectionItem | null>(null);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/auth/login');
      return;
    }
    fetchCollection();
  }, [isLoggedIn, user, navigate]);

  const fetchCollection = async () => {
    if (!user) return;
    setLoading(true);
    clearError();
    try {
      const fetchedItems = await collectionService.getUserCollection(user.id);
      setCollectionItems(fetchedItems);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch collection.');
      console.error('Fetch collection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!window.confirm('Are you sure you want to remove this anime from your collection?')) {
      return;
    }
    setLoading(true);
    clearError();
    try {
      await collectionService.deleteCollectionItem(itemId);
      alert('Anime removed from collection!');
      fetchCollection(); // Refresh list
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete collection item.');
      console.error('Delete item error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);
    clearError();
    try {
      const updateData: CollectionItemUpdate = {
        episodes_watched: editingItem.episodes_watched,
        rating: editingItem.rating,
        notes: editingItem.notes,
        is_favorite: editingItem.is_favorite,
      };
      await collectionService.updateCollectionItem(editingItem.id, updateData);
      alert('Collection item updated!');
      setEditingItem(null); // Exit editing mode
      fetchCollection(); // Refresh list
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update collection item.');
      console.error('Update item error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn || !user) {
    return <div className="text-center text-red-500">Please log in to view your collection.</div>;
  }

  if (loading) {
    return (
      <div className="text-center text-blue-500 text-xl py-8">Loading your collection...</div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My Anime Collection</h1>

      {editingItem && (
        <div className="mb-8 p-6 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Edit {editingItem.anime?.title}</h2>
          <form onSubmit={handleUpdateItem} className="space-y-4">
            <div>
              <label htmlFor="episodes_watched" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Episodes Watched
              </label>
              <input
                type="number"
                id="episodes_watched"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={editingItem.episodes_watched}
                onChange={(e) => setEditingItem({ ...editingItem, episodes_watched: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Rating (0-10)
              </label>
              <input
                type="number"
                id="rating"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={editingItem.rating || ''}
                onChange={(e) => setEditingItem({ ...editingItem, rating: parseFloat(e.target.value) || undefined })}
                min="0"
                max="10"
                step="0.5"
              />
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Notes
              </label>
              <textarea
                id="notes"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows={3}
                value={editingItem.notes || ''}
                onChange={(e) => setEditingItem({ ...editingItem, notes: e.target.value })}
              ></textarea>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_favorite"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={editingItem.is_favorite}
                onChange={(e) => setEditingItem({ ...editingItem, is_favorite: e.target.checked })}
              />
              <label htmlFor="is_favorite" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Favorite
              </label>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {collectionItems.length === 0 && !loading ? (
        <p className="text-center text-gray-500 text-xl">Your collection is empty. Start adding some anime!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {collectionItems.map((item) => (
            <CollectionItemCard
              key={item.id}
              item={item}
              onEdit={() => setEditingItem(item)}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCollectionPage;
