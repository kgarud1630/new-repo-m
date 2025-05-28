import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BookOpen, Film, Crown } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Your Gateway to Anime & Manga
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Discover, read, and watch your favorite content in one place
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/manga"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Browse Manga
          </Link>
          <Link
            to="/anime"
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Watch Anime
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <TrendingUp className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Latest Releases
            </h3>
            <p className="text-gray-400">
              Stay up to date with the newest chapters and episodes
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <BookOpen className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Extensive Library
            </h3>
            <p className="text-gray-400">
              Access thousands of manga titles and anime series
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <Film className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              HD Streaming
            </h3>
            <p className="text-gray-400">
              Enjoy high-quality anime streaming experience
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <Crown className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Premium Content
            </h3>
            <p className="text-gray-400">
              Access exclusive content with premium membership
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-indigo-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-indigo-100 mb-6">
            Join our community and get access to premium features
          </p>
          <Link
            to="/auth/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
