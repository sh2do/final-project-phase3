import React from 'react';

const DataItem = ({ item }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{item.name} (ID: {item.id})</h3>
      {item.description && (
        <p className="text-gray-600 mt-2">{item.description}</p>
      )}
    </div>
  );
};

export default DataItem;
