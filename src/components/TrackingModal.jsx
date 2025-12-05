import { ScanEye } from 'lucide-react';
import { X } from 'lucide-react';
import { TrackedAssetCard } from './TrackedAssetCard';
import { Image } from 'lucide-react';

export const TrackingModal = ({ isLoading, trackedAssets, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 rounded-xl border border-purple-500/30 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <ScanEye className="text-purple-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Internet Tracking Results</h2>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
  
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-400"></div>
                  <ScanEye className="absolute inset-0 m-auto text-purple-400" size={32} />
                </div>
                <p className="text-slate-300 text-lg mt-6 font-medium">Scanning the internet...</p>
                <p className="text-slate-500 text-sm mt-2">This may take a few moments</p>
              </div>
            ) : trackedAssets.length > 0 ? (
              <div className="space-y-4">
                <p className="text-slate-400 mb-4">
                  Found <span className="text-purple-400 font-bold">{trackedAssets.length}</span> potential matches
                </p>
                {trackedAssets.map((asset) => (
                  <TrackedAssetCard key={asset.position} asset={asset} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Image className="mx-auto mb-4 text-slate-600" size={64} />
                <p className="text-slate-400 text-lg">No matches found</p>
              </div>
            )}
          </div>
  
          {/* Footer */}
          {!isLoading && trackedAssets.length > 0 && (
            <div className="border-t border-slate-700 p-4 bg-slate-800/50">
              <button
                onClick={onClose}
                className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };