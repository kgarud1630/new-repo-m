import React from 'react';

function BrowseAnime() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Anime</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Content will be populated with actual anime data */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-w-3 aspect-h-4 bg-gray-200">
            {/* Placeholder for anime cover image */}
            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
          </div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseAnime;
