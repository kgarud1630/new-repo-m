import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, BookOpen, Clock, Heart, Share2, Plus } from 'lucide-react';

const ContentDetails = () => {
  const { contentType, id } = useParams();

  return (
    <div className="min-h-screen bg-dark-800">
      {/* Hero Banner */}
      <div className="relative h-96">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-800/90 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cover Image */}
            <div className="w-48 h-72 bg-dark-700 rounded-lg shadow-xl overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-dark-600 animate-pulse" />
            </div>
            
            {/* Content Info */}
            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                  {contentType === 'manga' ? 'MANGA' : 'ANIME'}
                </span>
                <span className="px-3 py-1 bg-dark-600 text-gray-300 text-sm rounded-full">
                  ONGOING
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-2">
                Title Coming Soon
              </h1>
              
              <div className="flex items-center gap-6 text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>4.5</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-5 h-5" />
                  <span>100 Chapters</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>Updated 2 days ago</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {contentType === 'manga' ? 'Start Reading' : 'Start Watching'}
                </button>
                <button className="btn-outline flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add to Library
                </button>
                <button className="btn-outline flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Favorite
                </button>
                <button className="btn-outline flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex border-b border-dark-600 mb-8">
          <button className="px-6 py-3 text-white font-medium border-b-2 border-primary-600">
            {contentType === 'manga' ? 'Chapters' : 'Episodes'}
          </button>
          <button className="px-6 py-3 text-gray-400 hover:text-white">
            Details
          </button>
          <button className="px-6 py-3 text-gray-400 hover:text-white">
            Comments
          </button>
        </div>
        
        {/* Chapter/Episode List */}
        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-dark-700 rounded-lg p-4 flex items-center justify-between hover:bg-dark-600 transition-colors"
            >
              <div>
                <h3 className="text-white font-medium mb-1">
                  {contentType === 'manga' ? `Chapter ${item}` : `Episode ${item}`}
                </h3>
                <p className="text-gray-400 text-sm">Released 3 days ago</p>
              </div>
              <Link
                to={`/${contentType}/${id}/${contentType === 'manga' ? 'chapter' : 'episode'}/${item}`}
                className="btn-primary"
              >
                {contentType === 'manga' ? 'Read' : 'Watch'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
