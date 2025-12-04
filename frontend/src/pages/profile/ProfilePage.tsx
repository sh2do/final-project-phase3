import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { userService } from '../../api';
import { UserUpdate } from '../../types/api';

const ProfilePage: React.FC = () => {
  const { user, setUser, token } = useAuthStore();
  const { setError, clearError } = useUiStore();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UserUpdate>({
    username: '',
    email: '',
    password: '', // New password field
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email,
        password: '', // Clear password field on load
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    clearError();

    try {
      // Filter out empty password if not changing
      const dataToUpdate: UserUpdate = { ...formData };
      if (!dataToUpdate.password) {
        delete dataToUpdate.password;
      }

      const updatedUser = await userService.updateUser(user.id, dataToUpdate);
      setUser(updatedUser); // Update user in store
      setEditing(false);
      setFormData({ ...formData, password: '' }); // Clear password field after update
      alert('Profile updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update profile.');
      console.error('Profile update error:', err);
    }
  };

  if (!user) {
    return <div className="text-center text-red-500 text-xl py-8">Please log in to view your profile.</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        {!editing ? (
          <div>
            <p className="text-lg mb-2"><strong>Username:</strong> {user.username || 'N/A'}</p>
            <p className="text-lg mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="text-lg mb-2"><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            <p className="text-lg mb-4"><strong>Status:</strong> {user.is_active ? 'Active' : 'Inactive'}</p>
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setEditing(false)}
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
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
