import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-12 shadow-inner">
      <div className="container mx-auto text-center text-sm">
        <p className="mb-2">&copy; {new Date().getFullYear()} AnimeTracker. All rights reserved.</p>
        <p>Data provided by <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Jikan API</a></p>
        <p className="mt-4">
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Privacy Policy</a> |
          <a href="#" className="text-gray-400 hover:text-gray-300 mx-2">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
