import React from 'react';
import { Globe } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      emoji: '🎵',
      title: 'Track ID',
      description: 'Add C2PA Manifest to Assets (Audio, Video, Images) before upload'
    },
    {
      icon: Globe,
      title: 'Search The Internet',
      description: 'Find exact asset match across the internet (support images only for now)'
    },
    {
      emoji: '🔄',
      title: 'C2PA Manifest Recognition',
      description: 'Detect C2PA in an asset and confirm if it\'s manifest matches a pre-signed manifest'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {features.map((feature, index) => (
        <div key={index} className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/20 text-center">
          <div className="text-2xl mb-2 w-full flex justify-center">
            {feature.icon ? <feature.icon /> : feature.emoji}
          </div>
          <p className="text-purple-200 text-sm font-semibold mb-1">{feature.title}</p>
          <p className="text-purple-400 text-xs">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
