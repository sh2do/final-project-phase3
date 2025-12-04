import React, { useState, useEffect } from 'react';
import { fetchData } from './services/api';
import DataItem from './components/DataItem';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <p className="text-xl text-gray-700">Loading anime data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 p-4">
        <p className="text-xl text-red-700">Error: {error}</p>
        <p className="text-red-500">Please ensure the backend server is running and accessible.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-600 text-white p-6 shadow-md rounded-b-lg">
        <h1 className="text-4xl font-bold text-center">Anime Collection Tracker</h1>
      </header>
      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">My Anime List</h2>
        {data.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No anime data available. Try refreshing or check backend.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <DataItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; 2023 Anime Collection Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
