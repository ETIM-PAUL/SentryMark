import React from 'react';
import { Brain } from 'lucide-react';

const InfoCard = () => {
  return (
    <div className="bg-purple-900/30 rounded-lg p-4 mb-6 border border-purple-700/30">
      <div className="flex items-start gap-3">
        <Brain className="w-5 h-5 text-purple-400 mt-0.5" />
        <div>
          <h3 className="text-purple-200 font-semibold mb-1">C2PA Infringement Tool</h3>
          <p className="text-purple-300 text-sm">
            Identifies copyrighted audio, images, and videos using advanced C2PA.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
