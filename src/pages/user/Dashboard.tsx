import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Clock, Heart, Star, TrendingUp, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-dark-700 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center overflow-hidden">
            {currentUser?.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-white">
                {currentUser?.displayName?.[0] || 'U'}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {currentUser?.displayName || 'User'}!
            </h1>
            <p className="text-gray-400">
              {currentUser?.isPremium ? 'Premium Member' : 'Free Member'} · 
              {currentUser?.coins || 0} Coins
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Reading Time</h3>
            <Clock className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-white">12.5h</p>
          <p className="text-gray-400">Total reading time</p>
        </div>

        <div className="bg-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Library</h3>
            <BookOpen className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-white">24</p>
          <p className="text-gray-400">Titles in library</p>
        </div>

        <div className="bg-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Favorites</h3>
            <Heart className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-white">8</p>
          <p className="text-gray-400">Favorited titles</p>
        </div>

        <div className="bg-dark-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Reviews</h3>
            <Star className="h-6 w-6 text-primary-500" />
          </div>
          <p className="text-3xl font-bold text-white">15</p>
          <p className="text-gray-400">Reviews written</p>
        </div>
      </div>

      {/* Continue Reading Section */}
      <div className="bg-dark-700 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Continue Reading</h2>
          <Link to="/user/library" className="text-primary-500 hover:text-primary-400">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for reading items */}
          <div className="bg-dark-600 rounded-lg p-4">
            <div className="aspect-w-3 aspect-h-4 bg-dark-500 rounded-md mb-4"></div>
            <h3 className="text-white font-medium mb-1">Loading...</h3>
            <p className="text-gray-400 text-sm">Chapter 0</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          <TrendingUp className="h-5 w-5 text-primary-500" />
        </div>
        <div className="space-y-4">
          {/* Activity items */}
          <div className="flex items-center justify-between p-4 bg-dark-600 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-dark-500 rounded"></div>
              <div>
                <h4 className="text-white font-medium">Loading activity...</h4>
                <p className="text-gray-400 text-sm">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6">
        <Link
          to="/user/settings"
          className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <Settings className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
