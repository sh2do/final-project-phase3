import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-56 bg-gray-300"></div>

      <div className="p-4 flex flex-col flex-grow">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

        {/* Score and Episodes placeholder */}
        <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/5"></div>
        </div>

        {/* Synopsis placeholder */}
        <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>

        {/* Button placeholder */}
        <div className="mt-auto pt-2">
          <div className="h-10 bg-gray-300 rounded-md w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
