import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      <p className="text-red-200">{message}</p>
    </div>
  );
};

export default ErrorAlert;
