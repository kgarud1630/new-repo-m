import React, { useState } from 'react';
import { Outlet, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, User, BarChart2, BookOpen, Film, Upload, 
  Settings, LogOut, ChevronDown, ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/common/Logo';

const AdminLayout: React.FC = () => {
  const { currentUser, logout, checkAdmin } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is admin
  if (!currentUser || !checkAdmin()) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  // Sidebar navigation items
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <BarChart2 className="h-5 w-5" /> 
    },
    { 
      name: 'Content Management', 
      path: '/admin/content', 
      icon: <BookOpen className="h-5 w-5" /> 
    },
    { 
      name: 'User Management', 
      path: '/admin/users', 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      name: 'Upload Content', 
      path: '/admin/upload', 
      icon: <Upload className="h-5 w-5" /> 
    },
  ];
  
  return (
    <div className="min-h-screen flex bg-dark-800">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 flex flex-col bg-dark-900 border-r border-dark-700 w-64`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-dark-700 flex items-center justify-between">
          <Logo />
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="flex-grow py-4 px-2 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-700/20 text-primary-500'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* User Section */}
          <div className="mt-auto pt-4 border-t border-dark-700 px-3 mt-6">
            <div className="flex items-center px-2 py-3">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center overflow-hidden">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white truncate">
                  {currentUser.displayName || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center w-full px-2 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-dark-700"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </button>
          </div>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-dark-800 border-b border-dark-700 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <h1 className="text-xl font-semibold text-white md:ml-0 ml-4">
              Admin Panel
            </h1>
            
            <div className="flex items-center">
              <Link 
                to="/"
                className="text-sm text-gray-400 hover:text-white mr-4"
              >
                View Site
              </Link>
              <button className="text-gray-400 hover:text-white">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-dark-800 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
