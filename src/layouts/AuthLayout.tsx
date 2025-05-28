import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/common/Logo';

const AuthLayout: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  // If user is already logged in, redirect to homepage
  if (currentUser) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-dark-800">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>
        <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">
          Back to Home
        </Link>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-6 text-center text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} OtakuVerse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
