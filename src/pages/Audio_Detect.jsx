import React, { useState, useRef } from 'react';
import Header from '../components/header';
import { Upload, Eye, FileText, User, Brain, Globe, CheckCircle, AlertCircle, Download, Loader2, Shield, Clock, Hash, XCircle } from 'lucide-react';
import { 
  FileUploadArea, 
  FormInput, 
  ErrorAlert, 
  SuccessResult, 
  InfoCard, 
  FeatureCards, 
  ActionButtons 
} from '../components/C2PA';

const Audio_Detect = () => {
    const [activeTab, setActiveTab] = useState('embed');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [creator, setCreator] = useState('');
    const [processing, setProcessing] = useState(false);
    const [processingType, setProcessingType] = useState(''); // 'local' or 'ipfs'
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // Detect tab states
    const [detectFile, setDetectFile] = useState(null);
    const [detectUrl, setDetectUrl] = useState('');
    const [detectMethod, setDetectMethod] = useState('file'); // 'file' or 'url'
    const [detecting, setDetecting] = useState(false);
    const [manifestData, setManifestData] = useState(null);
    const [detectError, setDetectError] = useState(null);
    const detectFileInputRef = useRef(null);

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const validTypes = ['image/', 'audio/', 'video/'];
        const isValid = validTypes.some(type => file.type.startsWith(type));
        
        if (isValid) {
          setUploadedFile(file);
          setResult(null);
          setError(null);
        } else {
          setError('Please upload a valid image, audio, or video file');
        }
      }
    };

    const handleAddC2PA = async (uploadToIPFS = false) => {
      if (!uploadedFile) {
        setError('Please upload a file first');
        return;
      }

      if (!title.trim()) {
        setError('Please enter a title');
        return;
      }

      if (!creator.trim()) {
        setError('Please enter a creator name');
        return;
      }

      setProcessing(true);
      setProcessingType(uploadToIPFS ? 'ipfs' : 'local');
      setError(null);
      setResult(null);

      try {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('title', title);
        formData.append('creator', creator);
        formData.append('uploadToIPFS', uploadToIPFS);

        // TODO: Replace with your actual C2PA backend endpoint
        const response = await fetch('http://localhost:3001/api/c2pa/sign', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to process file');
        }

        const data = await response.json();
        
        setResult({
          success: true,
          type: uploadToIPFS ? 'ipfs' : 'local',
          downloadUrl: data.downloadUrl,
          ipfsUrl: data.ipfsUrl,
          fileName: data.fileName,
        });
      } catch (err) {
        setError(`Failed to add C2PA manifest: ${err.message}`);
      } finally {
        setProcessing(false);
        setProcessingType('');
      }
    };

    const handleDetectFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const validTypes = ['image/', 'audio/', 'video/'];
        const isValid = validTypes.some(type => file.type.startsWith(type));
        
        if (isValid) {
          setDetectFile(file);
          setManifestData(null);
          setDetectError(null);
        } else {
          setDetectError('Please upload a valid image, audio, or video file');
        }
      }
    };

    const handleDetectManifest = async () => {
      // Validate input based on detection method
      if (detectMethod === 'file' && !detectFile) {
        setDetectError('Please upload a file first');
        return;
      }

      if (detectMethod === 'url' && !detectUrl.trim()) {
        setDetectError('Please enter a valid URL');
        return;
      }

      setDetecting(true);
      setDetectError(null);
      setManifestData(null);

      try {
        let response;

        if (detectMethod === 'file') {
          // File upload method
          const formData = new FormData();
          formData.append('file', detectFile);

          response = await fetch('http://localhost:3001/api/c2pa/validate', {
            method: 'POST',
            body: formData,
          });
        } else {
          // URL method
          response = await fetch('http://localhost:3001/api/c2pa/validate-url', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: detectUrl }),
          });
        }

        if (!response.ok) {
          throw new Error('Failed to validate file');
        }

        const data = await response.json();
        setManifestData(data);
      } catch (err) {
        setDetectError(`Failed to detect C2PA manifest: ${err.message}`);
      } finally {
        setDetecting(false);
      }
    };

  return (
    <div className="min-h-screen bg-purple-900">
      <Header/>

        <div className="text-center my-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl font-bold bg-pink-400 bg-clip-text text-transparent">
                C2PA Signing and Detection
            </h1>
          </div>
          <p className="text-xl text-purple-200 mb-3">
          Utilizing C2PA to track infringements on the internet
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-300">
            <span className="text-yellow-400">⚡</span>
            <span>C2PA Signed Assets • C2PA Signature Detection • Fully functional</span>
          </div>
        </div>


        {/* Content Card */}
        <div className="max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl mb-6 border border-purple-500/20 p-8">
            <>
              {/* Tab Navigation */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    setActiveTab('embed');
                    setResult(null);
                  }}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    activeTab === 'embed'
                      ? 'bg-pink-600 text-white scale-105'
                      : 'bg-slate-700/50 text-purple-200 hover:bg-slate-700'
                  }`}
                >
                  <Upload className="inline-block w-5 h-5 mr-2"  />
                  C2PA Embed
                </button>
                <button
                  onClick={() => {
                    setActiveTab('c2pa-detect');
                    setResult(null);
                  }}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    activeTab === 'c2pa-detect'
                      ? 'bg-pink-600 text-white  scale-105'
                      : 'bg-slate-700/50 text-purple-200 hover:bg-slate-700'
                  }`}
                >
                  <Eye className="inline-block w-5 h-5 mr-2" />
                  Detect Copyright
                </button>
              </div>

              {/* C2PA Embed Tab Content */}
              {activeTab === 'embed' && (
                <>
                  {/* File Upload Area */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,audio/*,video/*"
                    onChange={handleFileUpload}
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

                  {/* Title and Creator Inputs - Show only when file is uploaded */}
                  {uploadedFile && (
                    <div className="space-y-4 mb-6">
                      <div className="bg-slate-900/30 rounded-lg p-4 border border-purple-700/30">
                        <label className="text-purple-200 font-semibold mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter asset title..."
                          className="w-full bg-slate-800/50 border border-purple-700/50 rounded-lg px-4 py-3 text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                      </div>

                      <div className="bg-slate-900/30 rounded-lg p-4 border border-purple-700/30">
                        <label className="text-purple-200 font-semibold mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Creator
                        </label>
                        <input
                          type="text"
                          value={creator}
                          onChange={(e) => setCreator(e.target.value)}
                          placeholder="Enter creator name..."
                          className="w-full bg-slate-800/50 border border-purple-700/50 rounded-lg px-4 py-3 text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-red-200">{error}</p>
                    </div>
                  )}

                  {/* Success Result */}
                  {result && result.success && (
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
                  )}

                  {/* Info Card */}
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

                  {/* Action Buttons - Show only when file and inputs are filled */}
                  {uploadedFile && title && creator && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleAddC2PA(false)}
                        disabled={processing}
                        className="bg-green-700 hover:bg-green-800 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50"
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
                        onClick={() => handleAddC2PA(true)}
                        disabled={processing}
                        className="bg-blue-700 hover:bg-blue-800 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50"
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
                  )}
                </>
              )}

              {/* Detect Copyright Tab Content */}
              {activeTab === 'c2pa-detect' && (
                <>
                  {/* Detection Method Toggle */}
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={() => {
                        setDetectMethod('file');
                        setManifestData(null);
                        setDetectError(null);
                      }}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                        detectMethod === 'file'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-700/50 text-purple-200 hover:bg-slate-700'
                      }`}
                    >
                      <Upload className="inline-block w-4 h-4 mr-2" />
                      Upload File
                    </button>
                    <button
                      onClick={() => {
                        setDetectMethod('url');
                        setManifestData(null);
                        setDetectError(null);
                      }}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                        detectMethod === 'url'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-700/50 text-purple-200 hover:bg-slate-700'
                      }`}
                    >
                      <Globe className="inline-block w-4 h-4 mr-2" />
                      Use URL
                    </button>
                  </div>

                  {/* File Upload Area for Detection */}
                  {detectMethod === 'file' && (
                    <>
                      <input
                        ref={detectFileInputRef}
                        type="file"
                        accept="image/*,audio/*,video/*"
                        onChange={handleDetectFileUpload}
                        className="hidden"
                      />
                      <div
                        onClick={() => detectFileInputRef.current?.click()}
                        className="border-2 border-dashed border-blue-700/50 rounded-xl p-16 mb-6 text-center hover:border-blue-600/70 transition-colors cursor-pointer"
                      >
                        {detectFile ? (
                          <div className="space-y-4">
                            <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                            <p className="text-purple-200 text-lg font-semibold">{detectFile.name}</p>
                            <p className="text-purple-400 text-sm">
                              {detectFile.type} • {(detectFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <p className="text-purple-400 text-sm">Click to change file</p>
                          </div>
                        ) : (
                          <>
                            <Eye className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                            <p className="text-purple-200 text-lg mb-2">Click to upload file for detection</p>
                            <p className="text-purple-400 text-sm">Images • Audio • Video</p>
                            <p className="text-purple-500 text-xs mt-2">We'll scan for C2PA manifest data</p>
                          </>
                        )}
                      </div>
                    </>
                  )}

                  {/* URL Input Area */}
                  {detectMethod === 'url' && (
                    <div className="mb-6">
                      <div className="bg-slate-900/30 rounded-lg p-4 border border-blue-700/30">
                        <label className="text-purple-200 font-semibold mb-2 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Media URL
                        </label>
                        <input
                          type="url"
                          value={detectUrl}
                          onChange={(e) => setDetectUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg or ipfs://..."
                          className="w-full bg-slate-800/50 border border-blue-700/50 rounded-lg px-4 py-3 text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                        <p className="text-purple-400 text-xs mt-2">
                          Enter direct link to image, audio, or video file
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Detect Button */}
                  {((detectMethod === 'file' && detectFile) || (detectMethod === 'url' && detectUrl.trim())) && (
                    <div className="mb-6">
                      <button
                        onClick={handleDetectManifest}
                        disabled={detecting}
                        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/50"
                      >
                        {detecting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Detecting C2PA Manifest...
                          </>
                        ) : (
                          <>
                            <Shield className="w-5 h-5" />
                            Detect C2PA Manifest
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Error Message */}
                  {detectError && (
                    <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-red-200">{detectError}</p>
                    </div>
                  )}

                  {/* Manifest Results */}
                  {manifestData && (
                    <div className="space-y-6">
                      {/* Validation Status */}
                      <div className={`rounded-lg p-6 border-2 ${
                        manifestData.validation?.isValid 
                          ? 'bg-green-900/20 border-green-500/50' 
                          : 'bg-red-900/20 border-red-500/50'
                      }`}>
                        <div className="flex items-center gap-3 mb-4">
                          {manifestData.validation?.isValid ? (
                            <CheckCircle className="w-8 h-8 text-green-400" />
                          ) : (
                            <XCircle className="w-8 h-8 text-red-400" />
                          )}
                          <div>
                            <h3 className="text-2xl font-bold text-purple-100">
                              {manifestData.validation?.isValid ? 'Valid C2PA Manifest Found' : 'No Valid Manifest'}
                            </h3>
                            <p className="text-purple-300 text-sm mt-1">
                              {manifestData.validation?.hasManifest 
                                ? `Manifest is ${manifestData.validation?.isEmbedded ? 'embedded' : 'external'}`
                                : 'This file does not contain a C2PA manifest'
                              }
                            </p>
                          </div>
                        </div>

                        {/* Validation Warnings */}
                        {manifestData.validation?.validationStatus && manifestData.validation.validationStatus.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {manifestData.validation.validationStatus.map((status, index) => (
                              <div key={index} className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-yellow-300 text-sm font-semibold">{status.code}</p>
                                  <p className="text-yellow-200 text-xs">{status.explanation}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Manifest Information */}
                      {manifestData.activeManifest && (
                        <>
                          {/* Basic Info */}
                          <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-700/30">
                            <h4 className="text-xl font-bold text-purple-200 mb-4 flex items-center gap-2">
                              <FileText className="w-5 h-5" />
                              Manifest Information
                            </h4>
                            <div className="space-y-3">
                              {manifestData.activeManifest.title && (
                                <div className="flex items-start gap-3">
                                  <span className="text-purple-400 font-semibold min-w-[120px]">Title:</span>
                                  <span className="text-purple-100">{manifestData.activeManifest.title}</span>
                                </div>
                              )}
                              {manifestData.activeManifest.instance_id && (
                                <div className="flex items-start gap-3">
                                  <span className="text-purple-400 font-semibold min-w-[120px]">Instance ID:</span>
                                  <span className="text-purple-100 font-mono text-sm break-all">{manifestData.activeManifest.instance_id}</span>
                                </div>
                              )}
                              {manifestData.activeManifest.label && (
                                <div className="flex items-start gap-3">
                                  <span className="text-purple-400 font-semibold min-w-[120px]">Label:</span>
                                  <span className="text-purple-100 font-mono text-xs break-all">{manifestData.activeManifest.label}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Creator Information */}
                          {manifestData.activeManifest.assertions && (
                            <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-700/30">
                              <h4 className="text-xl font-bold text-purple-200 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Creator Information
                              </h4>
                              {manifestData.activeManifest.assertions.map((assertion, index) => {
                                if (assertion.label === 'stds.schema-org.CreativeWork' && assertion.data?.author) {
                                  return (
                                    <div key={index} className="space-y-2">
                                      {assertion.data.author.map((author, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                          <span className="text-purple-400 font-semibold">Name:</span>
                                          <span className="text-purple-100">{author.name}</span>
                                          {author['@type'] && (
                                            <span className="text-purple-300 text-sm">({author['@type']})</span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          )}

                          {/* Actions Timeline */}
                          {manifestData.activeManifest.assertions && (
                            <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-700/30">
                              <h4 className="text-xl font-bold text-purple-200 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Actions Timeline
                              </h4>
                              {manifestData.activeManifest.assertions.map((assertion, index) => {
                                if (assertion.label === 'c2pa.actions.v2' && assertion.data?.actions) {
                                  return (
                                    <div key={index} className="space-y-3">
                                      {assertion.data.actions.map((action, idx) => (
                                        <div key={idx} className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/20">
                                          <div className="flex items-center justify-between mb-2">
                                            <span className="text-purple-200 font-semibold">{action.action}</span>
                                            <span className="text-purple-400 text-sm">
                                              {new Date(action.when).toLocaleString()}
                                            </span>
                                          </div>
                                          {action.softwareAgent && (
                                            <p className="text-purple-300 text-sm">Agent: {action.softwareAgent}</p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          )}

                          {/* Signature Information */}
                          {manifestData.activeManifest.signature_info && (
                            <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-700/30">
                              <h4 className="text-xl font-bold text-purple-200 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Signature Information
                              </h4>
                              <div className="space-y-3">
                                {manifestData.activeManifest.signature_info.issuer && (
                                  <div className="flex items-start gap-3">
                                    <span className="text-purple-400 font-semibold min-w-[140px]">Issuer:</span>
                                    <span className="text-purple-100">{manifestData.activeManifest.signature_info.issuer}</span>
                                  </div>
                                )}
                                {manifestData.activeManifest.signature_info.common_name && (
                                  <div className="flex items-start gap-3">
                                    <span className="text-purple-400 font-semibold min-w-[140px]">Common Name:</span>
                                    <span className="text-purple-100">{manifestData.activeManifest.signature_info.common_name}</span>
                                  </div>
                                )}
                                {manifestData.activeManifest.signature_info.alg && (
                                  <div className="flex items-start gap-3">
                                    <span className="text-purple-400 font-semibold min-w-[140px]">Algorithm:</span>
                                    <span className="text-purple-100 font-mono">{manifestData.activeManifest.signature_info.alg}</span>
                                  </div>
                                )}
                                {manifestData.activeManifest.signature_info.cert_serial_number && (
                                  <div className="flex items-start gap-3">
                                    <span className="text-purple-400 font-semibold min-w-[140px]">Cert Serial:</span>
                                    <span className="text-purple-100 font-mono text-xs break-all">{manifestData.activeManifest.signature_info.cert_serial_number}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Claim Generator Info */}
                          {manifestData.activeManifest.claim_generator_info && (
                            <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-700/30">
                              <h4 className="text-xl font-bold text-purple-200 mb-4 flex items-center gap-2">
                                <Hash className="w-5 h-5" />
                                Claim Generator
                              </h4>
                              {manifestData.activeManifest.claim_generator_info.map((gen, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex items-center gap-3">
                                    <span className="text-purple-400 font-semibold">Name:</span>
                                    <span className="text-purple-100">{gen.name}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-purple-400 font-semibold">Version:</span>
                                    <span className="text-purple-100">{gen.version}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
        </div>
      </div>
  )
}

export default Audio_Detect
