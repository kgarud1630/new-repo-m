import React from 'react';
import { BookOpen } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent-500">
        <BookOpen className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-bold text-white">OtakuVerse</span>
    </div>
  );
};

export default Logo;
