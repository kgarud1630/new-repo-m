import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../utils/api';
import { useToast } from '../hooks/useToast';

// Google provider for authentication
const googleProvider = new GoogleAuthProvider();

// User interface with additional properties beyond Firebase User
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'user' | 'admin';
  coins: number;
  isPremium: boolean;
}

// Auth context interface
interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  checkAdmin: () => boolean;
  addCoins: (amount: number) => Promise<void>;
  updatePremiumStatus: (isPremium: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // Transform Firebase user to our User type with additional data
  const transformUser = async (firebaseUser: FirebaseUser): Promise<User> => {
    try {
      // Get additional user data from our API
      const { data } = await api.get(`/users/${firebaseUser.uid}`);
      
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || data.displayName,
        photoURL: firebaseUser.photoURL || data.photoURL,
        role: data.role || 'user',
        coins: data.coins || 0,
        isPremium: data.isPremium || false,
      };
    } catch (error) {
      // If user doesn't exist in our database yet, create with defaults
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        role: 'user',
        coins: 0,
        isPremium: false,
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await transformUser(firebaseUser);
          setCurrentUser(userData);
          
          // Create user in our database if it's a new sign-up
          try {
            await api.post('/users/check', { uid: firebaseUser.uid });
          } catch (error) {
            // User doesn't exist, create a new record
            await api.post('/users', userData);
          }
        } catch (error) {
          console.error('Error setting user data:', error);
          showToast('Error loading user profile', 'error');
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [showToast]);

  // Register new user with email and password
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user in our database
      await api.post('/users', {
        uid: userCredential.user.uid,
        email,
        displayName: name,
        role: 'user',
        coins: 0,
        isPremium: false,
      });
      
      showToast('Account created successfully!', 'success');
    } catch (error: any) {
      console.error('Registration error:', error);
      showToast(error.message || 'Failed to register', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with email and password
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast('Logged in successfully!', 'success');
    } catch (error: any) {
      console.error('Login error:', error);
      showToast(error.message || 'Failed to login', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if user exists in our database
      try {
        await api.get(`/users/${result.user.uid}`);
      } catch (error) {
        // If not, create a new user record
        const userData = await transformUser(result.user);
        await api.post('/users', userData);
      }
      
      showToast('Logged in with Google successfully!', 'success');
    } catch (error: any) {
      console.error('Google login error:', error);
      showToast(error.message || 'Failed to login with Google', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth);
      showToast('Logged out successfully', 'success');
    } catch (error: any) {
      console.error('Logout error:', error);
      showToast(error.message || 'Failed to logout', 'error');
      throw error;
    }
  };

  // Send password reset email
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      showToast('Password reset email sent!', 'success');
    } catch (error: any) {
      console.error('Reset password error:', error);
      showToast(error.message || 'Failed to send reset email', 'error');
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<User>) => {
    if (!currentUser) return;
    
    try {
      await api.put(`/users/${currentUser.uid}`, data);
      
      // Update local state
      setCurrentUser(prev => prev ? { ...prev, ...data } : null);
      showToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      console.error('Update profile error:', error);
      showToast(error.message || 'Failed to update profile', 'error');
      throw error;
    }
  };

  // Check if current user is admin
  const checkAdmin = () => {
    return currentUser?.role === 'admin';
  };

  // Add coins to user account
  const addCoins = async (amount: number) => {
    if (!currentUser) return;
    
    try {
      const newCoins = currentUser.coins + amount;
      await api.put(`/users/${currentUser.uid}`, { coins: newCoins });
      
      // Update local state
      setCurrentUser(prev => prev ? { ...prev, coins: newCoins } : null);
      showToast(`${amount} coins added to your account!`, 'success');
    } catch (error: any) {
      console.error('Add coins error:', error);
      showToast(error.message || 'Failed to add coins', 'error');
      throw error;
    }
  };

  // Update premium status
  const updatePremiumStatus = async (isPremium: boolean) => {
    if (!currentUser) return;
    
    try {
      await api.put(`/users/${currentUser.uid}`, { isPremium });
      
      // Update local state
      setCurrentUser(prev => prev ? { ...prev, isPremium } : null);
      showToast(
        isPremium 
          ? 'Premium subscription activated!' 
          : 'Premium subscription canceled', 
        'success'
      );
    } catch (error: any) {
      console.error('Update premium status error:', error);
      showToast(error.message || 'Failed to update subscription', 'error');
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    checkAdmin,
    addCoins,
    updatePremiumStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
