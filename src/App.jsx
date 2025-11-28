import React from 'react';
import AIWatermarkAndDetect from './pages/AI_Detect';
import Header from './components/header';
import { Toaster } from 'react-hot-toast';

const MultiAppDashboard = () => {

  return (
  <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Tab Navigation */}
      <Header/>

      <AIWatermarkAndDetect/>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#fff',
            border: '1px solid rgba(168, 85, 247, 0.4)'
          }
        }}
      />

    </div>
  );
};

export default MultiAppDashboard;