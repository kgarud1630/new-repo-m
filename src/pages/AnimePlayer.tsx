import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, Volume2, Settings, Maximize2, SkipBack, SkipForward } from 'lucide-react';

const AnimePlayer: React.FC = () => {
  const { id, episodeId } = useParams();

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Video Player Section */}
      <div className="relative aspect-video bg-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Video player loading...</p>
        </div>
        
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-600 rounded-full mb-4">
            <div className="w-1/3 h-full bg-primary-500 rounded-full"></div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-primary-500 transition-colors">
                <Play className="w-6 h-6" />
              </button>
              <button className="text-white hover:text-primary-500 transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-primary-500 transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-white" />
                <div className="w-20 h-1 bg-gray-600 rounded-full">
                  <div className="w-2/3 h-full bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-white text-sm">12:34 / 23:45</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-primary-500 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="text-white hover:text-primary-500 transition-colors">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Episode Information */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-dark-800 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-white mb-2">Episode Title</h1>
          <p className="text-gray-400 mb-4">Episode {episodeId} • Series: {id}</p>
          <p className="text-gray-300">
            Episode description and synopsis will be displayed here. The content will be dynamically loaded based on the episode data.
          </p>
        </div>
        
        {/* Episode List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">More Episodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((episode) => (
              <div key={episode} className="bg-dark-800 rounded-lg overflow-hidden hover:bg-dark-700 transition-colors">
                <div className="aspect-video bg-dark-600"></div>
                <div className="p-4">
                  <h3 className="text-white font-medium">Episode {episode}</h3>
                  <p className="text-gray-400 text-sm">23:45 • Released 3 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePlayer;
