import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, Search, Bell, User, LogOut, BookOpen, Home, Film, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/common/Logo';

interface MainLayoutProps {
  requireAuth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ requireAuth = false }) => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Check if user is authenticated when required
  if (requireAuth && !currentUser) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  
  // Listen for scroll to add background to header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#mobile-menu') && !target.closest('#mobile-menu-button')) {
        setIsMenuOpen(false);
      }
      if (!target.closest('#user-menu') && !target.closest('#user-menu-button')) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-dark-800 shadow-lg' : 'bg-gradient-to-b from-dark-900 to-transparent'
        }`}
      >
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="nav-link text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/manga" className="nav-link text-gray-300 hover:text-white transition-colors">
                Manga
              </Link>
              <Link to="/anime" className="nav-link text-gray-300 hover:text-white transition-colors">
                Anime
              </Link>
              <Link to="/pricing" className="nav-link text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
            </nav>
            
            {/* Search and User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-dark-600 text-white pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-48 lg:w-64"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              {currentUser ? (
                <div className="relative" id="user-menu">
                  <button
                    id="user-menu-button"
                    className="flex items-center space-x-2 text-white"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center overflow-hidden">
                      {currentUser.photoURL ? (
                        <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <span className="hidden lg:inline text-sm font-medium">
                      {currentUser.displayName || 'User'}
                    </span>
                  </button>
                  
                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-dark-700 border border-dark-600 rounded-lg shadow-xl py-1 z-50"
                      >
                        <Link
                          to="/user/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-dark-600 w-full text-left"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          to="/user/library"
                          className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-dark-600 w-full text-left"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          My Library
                        </Link>
                        <Link
                          to="/user/coins"
                          className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-dark-600 w-full text-left"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          Buy Coins
                        </Link>
                        <hr className="border-dark-500 my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-dark-600 w-full text-left"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="bg-primary-700 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              {currentUser && (
                <button className="p-1 mr-2 text-gray-300 hover:text-white">
                  <Bell className="h-6 w-6" />
                </button>
              )}
              <button
                id="mobile-menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-1 text-gray-300 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 bg-dark-800 z-40 border-t border-dark-700 md:hidden"
          >
            <div className="px-4 py-2">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-dark-600 text-white pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/"
                  className="flex items-center py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="mr-2 h-5 w-5" />
                  Home
                </Link>
                <Link
                  to="/manga"
                  className="flex items-center py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Manga
                </Link>
                <Link
                  to="/anime"
                  className="flex items-center py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Film className="mr-2 h-5 w-5" />
                  Anime
                </Link>
                <Link
                  to="/pricing"
                  className="flex items-center py-2 text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pricing
                </Link>
              </nav>
              
              {currentUser ? (
                <div className="mt-4 pt-4 border-t border-dark-600">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center overflow-hidden">
                      {currentUser.photoURL ? (
                        <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium">{currentUser.displayName || 'User'}</p>
                      <p className="text-gray-400 text-sm">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <Link
                      to="/user/dashboard"
                      className="flex items-center py-2 text-gray-300 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-2 h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      to="/user/library"
                      className="flex items-center py-2 text-gray-300 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BookOpen className="mr-2 h-5 w-5" />
                      My Library
                    </Link>
                    <Link
                      to="/user/coins"
                      className="flex items-center py-2 text-gray-300 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Buy Coins
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center py-2 text-gray-300 hover:text-white"
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-dark-600">
                  <Link
                    to="/auth/login"
                    className="bg-primary-700 hover:bg-primary-600 text-white py-2 px-4 rounded-lg font-medium w-full inline-block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="mt-2 border border-primary-700 text-primary-500 py-2 px-4 rounded-lg font-medium w-full inline-block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-dark-900 py-10 mt-auto">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo />
              <p className="mt-4 text-gray-400 text-sm">
                OtakuVerse is your ultimate destination for manga, manhwa, and anime, offering a vast collection of titles from around the world.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><Link to="/manga" className="text-gray-400 hover:text-white text-sm">Manga</Link></li>
                <li><Link to="/anime" className="text-gray-400 hover:text-white text-sm">Anime</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white text-sm">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link to="/user/dashboard" className="text-gray-400 hover:text-white text-sm">My Dashboard</Link></li>
                <li><Link to="/user/library" className="text-gray-400 hover:text-white text-sm">My Library</Link></li>
                <li><Link to="/user/settings" className="text-gray-400 hover:text-white text-sm">Settings</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white text-sm">Copyright</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-dark-700 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} OtakuVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
