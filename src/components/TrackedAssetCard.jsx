  // Tracked Asset Card Component
  import { ExternalLink } from 'lucide-react';
  
  export const TrackedAssetCard = ({ asset }) => {
    return (
      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-purple-500/50 transition-all">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <img 
            src={asset.thumbnail} 
            alt={asset.title}
            className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
          />
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-white font-semibold line-clamp-2 flex-1">
                {asset.title}
              </h3>
              <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs font-medium flex-shrink-0">
                #{asset.position}
              </span>
            </div>
            
            <p className="text-slate-400 text-sm mb-2">{asset.source}</p>
            
            {asset.extensions && (
              <div className="flex flex-wrap gap-2 mb-3">
                {asset.extensions.map((ext, idx) => (
                  <span key={idx} className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                    {ext}
                  </span>
                ))}
              </div>
            )}
            
            <a
              href={asset.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors"
            >
              View Source <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    );
  };