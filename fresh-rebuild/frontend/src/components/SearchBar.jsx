import { useState, useCallback } from 'react';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }, [onSearch]);

  return (
    <div className="w-full mb-8">
      <input
        type="text"
        placeholder="Search anime... (e.g., 'Demon Slayer', 'Attack on Titan')"
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
