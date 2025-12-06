import React from 'react';
import { CheckCircle, Download } from 'lucide-react';

const SuccessResult = ({ result }) => {
  if (!result || !result.success) return null;

  return (
    <div className="mb-6">
      {result.type === 'local' ? (
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold text-green-300">C2PA Manifest Added Successfully!</h3>
          </div>
          <p className="text-purple-200 mb-4">Your file has been signed with C2PA manifest.</p>
          <a
            href={result.downloadUrl}
            download
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            <Download className="w-5 h-5" />
            Download Signed File
          </a>
        </div>
      ) : (
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-blue-300">Uploaded to IPFS!</h3>
          </div>
          <p className="text-purple-200 mb-3">Your file has been signed with C2PA and uploaded to IPFS.</p>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-blue-700/30">
            <p className="text-xs text-blue-400 mb-2">IPFS URL</p>
            <p className="text-blue-200 font-mono text-sm break-all">{result.ipfsUrl}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessResult;
