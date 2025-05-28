import React from 'react';

const BrowseManga = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Manga</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Placeholder for manga list - to be implemented */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="aspect-w-3 aspect-h-4 mb-4 bg-gray-200 rounded-md"></div>
          <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-600">Manga content will be available soon.</p>
        </div>
      </div>
    </div>
  );
};

export default BrowseManga;
