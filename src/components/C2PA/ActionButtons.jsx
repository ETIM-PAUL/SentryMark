import React from 'react';
import { Loader2, Download, Globe } from 'lucide-react';

const ActionButtons = ({ onLocalClick, onIPFSClick, processing, processingType, disabled }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={onLocalClick}
        disabled={disabled || processing}
        className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
      >
        {processing && processingType === 'local' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            Add C2PA & Return Asset
          </>
        )}
      </button>

      <button
        onClick={onIPFSClick}
        disabled={disabled || processing}
        className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50"
      >
        {processing && processingType === 'ipfs' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Uploading to IPFS...
          </>
        ) : (
          <>
            <Globe className="w-5 h-5" />
            Add C2PA, Upload to IPFS
          </>
        )}
      </button>
    </div>
  );
};

export default ActionButtons;
