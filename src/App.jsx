import React, { useState } from 'react';
import { Upload, Eye, Scale, Music, Globe, Link } from 'lucide-react';
import { useNavigate } from 'react-router';
import AIWatermarkAndDetect from './pages/AI_Detect';
import Header from './components/header';

const MultiAppDashboard = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Tab Navigation */}
      <Header/>

      <AIWatermarkAndDetect/>

    </div>
  );
};

export default MultiAppDashboard;