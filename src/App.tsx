import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from './components/ui/Toast';
import { AuthProvider } from './contexts/AuthContext';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

// Public pages
import HomePage from './pages/HomePage';
import BrowseManga from './pages/BrowseManga';
import BrowseAnime from './pages/BrowseAnime';
import ContentDetails from './pages/ContentDetails';
import MangaReader from './pages/MangaReader';
import AnimePlayer from './pages/AnimePlayer';
import Pricing from './pages/Pricing';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Protected pages
import UserDashboard from './pages/user/Dashboard';
import UserLibrary from './pages/user/Library';
import UserSettings from './pages/user/Settings';
import PurchaseCoins from './pages/user/PurchaseCoins';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminContent from './pages/admin/Content';
import AdminUsers from './pages/admin/Users';
import AdminUpload from './pages/admin/Upload';

// Not found page
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="manga" element={<BrowseManga />} />
          <Route path="anime" element={<BrowseAnime />} />
          <Route path="content/:contentType/:id" element={<ContentDetails />} />
          <Route path="manga/:id/chapter/:chapterId" element={<MangaReader />} />
          <Route path="anime/:id/episode/:episodeId" element={<AnimePlayer />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>

        {/* Auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected user routes */}
        <Route path="/user" element={<MainLayout requireAuth />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="library" element={<UserLibrary />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="coins" element={<PurchaseCoins />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="upload" element={<AdminUpload />} />
        </Route>

        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
