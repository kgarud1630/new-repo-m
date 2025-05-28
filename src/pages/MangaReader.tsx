import React from 'react';
import { useParams } from 'react-router-dom';

const MangaReader = () => {
  const { id, chapterId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Chapter {chapterId}</h1>
        <div className="bg-white rounded-lg shadow-lg p-4">
          {/* Manga reader content will be implemented here */}
          <p className="text-gray-600">Loading chapter content...</p>
        </div>
      </div>
    </div>
  );
};

export default MangaReader;
