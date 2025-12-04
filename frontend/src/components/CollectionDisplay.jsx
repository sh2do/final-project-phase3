import React, { useState, useEffect } from 'react';
import { collectionService } from '../services/api';

const CollectionDisplay = ({ userId = 'testUser123' }) => {
  const [collectionItems, setCollectionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemStatus, setNewItemStatus] = useState('Watching');
  const [editingItem, setEditingItem] = useState(null); // { id, title, status }

  useEffect(() => {
    fetchCollectionItems();
  }, [userId]);

  const fetchCollectionItems = async () => {
    setLoading(true);
    setError(null);
    const result = await collectionService.getCollectionItems(userId);
    if (result.success) {
      setCollectionItems(result.data);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    if (!newItemTitle) {
      alert('Anime title cannot be empty.');
      return;
    }
    setLoading(true);
    setError(null);
    const newItemData = {
      animeId: Math.random().toString(36).substring(7), // Mock animeId
      title: newItemTitle,
      status: newItemStatus,
      score: 0,
    };
    const result = await collectionService.createCollectionItem(userId, newItemData);
    if (result.success) {
      setNewItemTitle('');
      setNewItemStatus('Watching');
      fetchCollectionItems(); // Refresh list
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    setError(null);
    const result = await collectionService.deleteCollectionItem(userId, itemId);
    if (result.success) {
      fetchCollectionItems(); // Refresh list
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title) {
      alert('Anime title cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);
    const result = await collectionService.updateCollectionItem(userId, editingItem.id, {
      title: editingItem.title,
      status: editingItem.status,
      // Add other fields you want to update
    });
    if (result.success) {
      setEditingItem(null); // Exit editing mode
      fetchCollectionItems(); // Refresh list
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  if (loading) return <div className="text-center text-blue-500">Loading collection...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Anime Collection (User: {userId})</h2>

      {/* Add New Item Form */}
      <form onSubmit={handleCreateItem} className="mb-8 p-4 border rounded shadow-sm bg-gray-100">
        <h3 className="text-xl font-semibold mb-3">Add New Anime</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Anime Title"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            className="flex-grow p-2 border rounded"
            required
          />
          <select
            value={newItemStatus}
            onChange={(e) => setNewItemStatus(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Watching">Watching</option>
            <option value="Completed">Completed</option>
            <option value="Planned">Planned</option>
            <option value="Dropped">Dropped</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add to Collection
          </button>
        </div>
      </form>

      {/* Editing Form */}
      {editingItem && (
        <form onSubmit={handleUpdateItem} className="mb-8 p-4 border rounded shadow-sm bg-yellow-100">
          <h3 className="text-xl font-semibold mb-3">Edit Anime: {editingItem.title}</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Anime Title"
              value={editingItem.title}
              onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
              className="flex-grow p-2 border rounded"
              required
            />
            <select
              value={editingItem.status}
              onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="Planned">Planned</option>
              <option value="Dropped">Dropped</option>
            </select>
            <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}


      {/* Collection List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collectionItems.length === 0 ? (
          <p>No anime in your collection yet. Add some!</p>
        ) : (
          collectionItems.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow-md bg-white">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>Status: {item.status}</p>
              {item.score > 0 && <p>Score: {item.score}</p>}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CollectionDisplay;
