import React, { useState, useEffect, createContext, useContext } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  };

  const hideToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} hideToast={hideToast} />
    </ToastContext.Provider>
  );
};

// Individual toast component
const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastClasses = () => {
    const baseClasses = 'flex items-center p-4 mb-3 rounded-lg shadow-lg';
    
    switch (toast.type) {
      case 'success':
        return `${baseClasses} bg-secondary-600 text-white`;
      case 'error':
        return `${baseClasses} bg-accent-600 text-white`;
      case 'warning':
        return `${baseClasses} bg-yellow-500 text-dark-800`;
      default:
        return `${baseClasses} bg-primary-600 text-white`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={getToastClasses()}
    >
      <div className="flex-1">{toast.message}</div>
      <button 
        onClick={onClose} 
        className="ml-4 p-1 rounded-full hover:bg-black hover:bg-opacity-20 transition-colors"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

// Toast container component
export const ToastContainer: React.FC<{
  toasts: Toast[];
  hideToast: (id: string) => void;
}> = ({ toasts, hideToast }) => {
  return (
    <div className="fixed bottom-0 right-0 p-4 w-full sm:w-96 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export { ToastContext }
