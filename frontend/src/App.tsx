import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useUiStore } from './store/uiStore';
import { authService } from './api';

// Page Imports - will create these as part of the rewrite
import HomePage from './pages/dashboard/HomePage';
import SearchPage from './pages/anime/SearchPage';
import AnimeDetailPage from './pages/anime/AnimeDetailPage';
import MyCollectionPage from './pages/collection/MyCollectionPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage'; // Will create this

// UI Components
import { LoadingSpinner } from './components/common/LoadingSpinner'; // Will create this
import { ErrorNotification } from './components/common/ErrorNotification'; // Will create this


function App() {
  const { token, user, isLoggedIn, clearAuth, setUser } = useAuthStore();
  const { isLoading, error, clearError } = useUiStore();
  const navigate = useNavigate();

  // Attempt to fetch user details if token exists but user object is not loaded
  useEffect(() => {
    if (token && !user) {
      const fetchUser = async () => {
        try {
          const fetchedUser = await authService.getMe();
          setUser(fetchedUser);
        } catch (err) {
          console.error("Failed to fetch user on app load:", err);
          clearAuth(); // Clear token if user fetch fails (e.g., expired token)
          navigate('/auth/login');
        }
      };
      fetchUser();
    }
  }, [token, user, setUser, clearAuth, navigate]);


  const handleLogout = () => {
    clearAuth();
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <nav className="p-4 border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-xl text-blue-600 dark:text-blue-400">Anime Tracker</Link>
          <div className="space-x-4 flex items-center">
            <Link to="/anime/search" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Search</Link>
            {isLoggedIn && <Link to="/collection" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">My Collection</Link>}
            {isLoggedIn && <Link to="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Profile</Link>}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors">
                Logout
              </button>
            ) : (
              <>
                <Link to="/auth/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">Login</Link>
                <Link to="/auth/register" className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded transition-colors">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Global Loading Indicator */}
      {isLoading && <LoadingSpinner />}

      {/* Global Error Notification */}
      {error && <ErrorNotification message={error} onClose={clearError} />}

      <main className="container mx-auto p-4 flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/anime/search" element={<SearchPage />} />
          <Route path="/anime/:id" element={<AnimeDetailPage />} />
          <Route path="/collection" element={isLoggedIn ? <MyCollectionPage /> : <LoginPage />} />
          <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <LoginPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} /> {/* Catch all for 404 */}
        </Routes>
      </main>

      {/* Optional Footer */}
      <footer className="p-4 mt-8 border-t bg-white dark:bg-gray-800 text-center text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Anime Tracker. All rights reserved.
      </footer>
    </div>
  );
}

export default App;