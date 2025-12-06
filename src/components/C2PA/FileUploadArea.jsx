import React from 'react';
import { Upload, CheckCircle } from 'lucide-react';

const FileUploadArea = ({ uploadedFile, fileInputRef, onFileChange }) => {
  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,audio/*,video/*"
        onChange={onFileChange}
        className="hidden"
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-purple-700/50 rounded-xl p-16 mb-6 text-center hover:border-purple-600/70 transition-colors cursor-pointer"
      >
        {uploadedFile ? (
          <div className="space-y-4">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
            <p className="text-purple-200 text-lg font-semibold">{uploadedFile.name}</p>
            <p className="text-purple-400 text-sm">
              {uploadedFile.type} • {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <p className="text-purple-400 text-sm">Click to change file</p>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="text-purple-200 text-lg mb-2">Click to upload your file</p>
            <p className="text-purple-400 text-sm">Images • Audio • Video</p>
            <p className="text-purple-500 text-xs mt-2">JPG, PNG, MP3, WAV, MP4, MOV</p>
          </>
        )}
      </div>
    </>
  );
};

export default FileUploadArea;
