import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold tracking-wider">
          AnimeTracker
        </a>
        {/* Navigation links can be added here if needed */}
        {/*
        <div>
          <a href="/collection" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">My Collection</a>
          <a href="/about" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">About</a>
        </div>
        */}
      </div>
    </nav>
  );
};

export default Navbar;
