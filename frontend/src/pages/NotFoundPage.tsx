import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] bg-gray-100 dark:bg-gray-900 px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-extrabold text-gray-700 dark:text-gray-300">404</h1>
        <p className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-400 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg md:text-xl text-gray-500 dark:text-gray-500 mt-2 mb-8">
          It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
