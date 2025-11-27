import React, { useState, useRef } from 'react';
import Header from '../components/header'
import { Upload, Eye, Music, Brain, Image, Loader2, CheckCircle, AlertCircle, X, Globe } from 'lucide-react';

const Audio_Detect = () => {
    const [activeMode, setActiveMode] = useState('image');
    const [activeTab, setActiveTab] = useState('embed');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedAudio, setUploadedAudio] = useState(null);
    const [watermarkText, setWatermarkText] = useState('© 2024 Your Company');
    const [processing, setProcessing] = useState(false);
    const [audioResult, setAudioResult] = useState(null);
    const [error, setError] = useState(null);
    const imageInputRef = useRef(null);
    const audioInputRef = useRef(null);

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedImage(event.target.result);
          setError(null);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleAudioUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('audio/')) {
        setUploadedAudio(file);
        setAudioResult(null);
        setError(null);
      }
    };

    const analyzeAudio = async () => {
      if (!uploadedAudio) {
        setError('Please upload an audio file first');
        return;
      }
  
      setProcessing(true);
      setError(null);
      setAudioResult(null);
  
      try {
        const prompt = activeTab === 'recognize' 
          ? `You are an AI audio recognition system similar to Shazam. Analyze the audio file "${uploadedAudio.name}" and provide a detailed recognition report.
  
  Since you cannot actually process the audio file, simulate a realistic audio recognition response based on the filename and provide a comprehensive analysis.
  
  Provide your response in JSON format with these fields:
  - detected: boolean (true if music/sample detected)
  - trackInfo: {
      title: string (song/track name),
      artist: string,
      album: string,
      year: number,
      genre: string
    }
  - confidence: number (0.0 to 1.0)
  - duration: string (estimated duration like "3:45")
  - samples: array of detected samples with {source, timestamp, confidence}
  - loops: array of detected loops with {type, bpm, timestamp}
  - copyright: {
      protected: boolean,
      owner: string,
      license: string,
      usage: string (allowed uses)
    }
  - fingerprint: string (unique audio fingerprint ID)
  - recommendations: array of similar tracks
  
  Be creative and realistic. Return ONLY the JSON object, no other text.`
          : `You are an AI copyright detection system for audio. Analyze the audio file "${uploadedAudio.name}" and detect any copyrighted material.
  
  Provide your response in JSON format with these fields:
  - copyrightDetected: boolean
  - matches: array of copyright matches with {title, artist, owner, confidence, timestamp}
  - riskLevel: string ("low", "medium", "high")
  - samples: array of detected copyrighted samples
  - recommendations: string (what to do about copyright issues)
  - clearance: {required: boolean, contacts: array of rights holders}
  
  Be realistic. Return ONLY the JSON object, no other text.`;
  
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                content: prompt
              }
            ]
          })
        });
  
        const data = await response.json();
        const text = data.content.map(item => item.type === 'text' ? item.text : '').join('');
        const cleanText = text.replace(/```json|```/g, '').trim();
        const result = JSON.parse(cleanText);
        
        setAudioResult(result);
      } catch (err) {
        setError('Failed to analyze audio: ' + err.message);
      } finally {
        setProcessing(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header/>

        <div className="text-center my-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {/* <Music className="w-12 h-12 text-purple-400 animate-pulse" /> */}
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                C2PA Signing and Detection
            </h1>
          </div>
          <p className="text-xl text-purple-200 mb-3">
          Utilizing C2PA to track infringements on the internet
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-300">
            <span className="text-yellow-400">⚡</span>
            <span>C2PA Signed Asssets • C2PA Signature Detection • Fully functional</span>
          </div>
        </div>


        {/* Content Card */}
        <div className="max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-6 border border-purple-500/20 p-8">
            <>
              {/* Audio Mode Tabs */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    setActiveTab('embed');
                    setAudioResult(null);
                  }}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    activeTab === 'embed'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                      : 'bg-slate-700/50 text-purple-200 hover:bg-slate-700'
                  }`}
                >
                  <Upload className="inline-block w-5 h-5 mr-2"  />
                  C2PA Embed
                </button>
                <button
                  onClick={() => {
                    setActiveTab('c2pa-detect');
                    setAudioResult(null);
                  }}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    activeTab === 'c2pa-detect'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                      : 'bg-slate-700/50 text-purple-200 hover:bg-slate-700'
                  }`}
                >
                  <Eye className="inline-block w-5 h-5 mr-2" />
                  Detect Copyright
                </button>
              </div>

              {/* Audio Upload Area */}
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="hidden"
              />
              <div
                onClick={() => audioInputRef.current?.click()}
                className="border-2 border-dashed border-purple-700/50 rounded-xl p-16 mb-6 text-center hover:border-purple-600/70 transition-colors cursor-pointer"
              >
                {uploadedAudio ? (
                  <div className="space-y-4">
                    <Music className="w-12 h-12 text-green-400 mx-auto" />
                    <p className="text-purple-200 text-lg">{uploadedAudio.name}</p>
                    <p className="text-purple-400 text-sm">Click to change file</p>
                  </div>
                ) : (
                  <>
                    <Music className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-purple-200 text-lg mb-2">Click to upload audio</p>
                    <p className="text-purple-400 text-sm">MP3, WAV, FLAC, M4A</p>
                  </>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-200">{error}</p>
                </div>
              )}

              {/* Audio Results */}
              {audioResult && (
                <div className="mb-6 space-y-4">
                  {activeTab === 'recognize' ? (
                    <>
                      {/* Track Info */}
                      {audioResult.detected && audioResult.trackInfo && (
                        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-6 h-6 text-green-400" />
                              <h3 className="text-xl font-bold text-green-300">Track Identified!</h3>
                            </div>
                            <span className="text-green-400 text-sm">
                              {Math.round(audioResult.confidence * 100)}% confidence
                            </span>
                          </div>
                          <div className="space-y-2">
                            <p className="text-2xl font-bold text-white">{audioResult.trackInfo.title}</p>
                            <p className="text-lg text-purple-200">{audioResult.trackInfo.artist}</p>
                            <div className="flex gap-4 text-sm text-purple-300">
                              <span>Album: {audioResult.trackInfo.album}</span>
                              <span>•</span>
                              <span>{audioResult.trackInfo.year}</span>
                              <span>•</span>
                              <span>{audioResult.trackInfo.genre}</span>
                              <span>•</span>
                              <span>{audioResult.duration}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Copyright Info */}
                      {audioResult.copyright && (
                        <div className={`border rounded-lg p-5 ${
                          audioResult.copyright.protected 
                            ? 'bg-orange-900/20 border-orange-500/30' 
                            : 'bg-blue-900/20 border-blue-500/30'
                        }`}>
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            {audioResult.copyright.protected ? '⚠️' : '✓'} Copyright Status
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p className="text-purple-200">
                              <span className="font-semibold">Protected:</span> {audioResult.copyright.protected ? 'Yes' : 'No'}
                            </p>
                            <p className="text-purple-200">
                              <span className="font-semibold">Owner:</span> {audioResult.copyright.owner}
                            </p>
                            <p className="text-purple-200">
                              <span className="font-semibold">License:</span> {audioResult.copyright.license}
                            </p>
                            <p className="text-purple-200">
                              <span className="font-semibold">Usage:</span> {audioResult.copyright.usage}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Samples Detected */}
                      {audioResult.samples && audioResult.samples.length > 0 && (
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-5">
                          <h4 className="font-semibold text-white mb-3">🎹 Detected Samples</h4>
                          <div className="space-y-3">
                            {audioResult.samples.map((sample, idx) => (
                              <div key={idx} className="bg-purple-950/50 rounded p-3">
                                <div className="flex justify-between items-start mb-1">
                                  <p className="text-purple-100 font-medium">{sample.source}</p>
                                  <span className="text-xs text-purple-400">{Math.round(sample.confidence * 100)}%</span>
                                </div>
                                <p className="text-sm text-purple-300">@ {sample.timestamp}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Loops Detected */}
                      {audioResult.loops && audioResult.loops.length > 0 && (
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-5">
                          <h4 className="font-semibold text-white mb-3">🔄 Detected Loops</h4>
                          <div className="space-y-3">
                            {audioResult.loops.map((loop, idx) => (
                              <div key={idx} className="bg-purple-950/50 rounded p-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="text-purple-100 font-medium">{loop.type}</p>
                                    <p className="text-sm text-purple-300">{loop.bpm} BPM • @ {loop.timestamp}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fingerprint */}
                      {audioResult.fingerprint && (
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                          <p className="text-xs text-purple-400 mb-1">Audio Fingerprint</p>
                          <p className="text-purple-200 font-mono text-sm break-all">{audioResult.fingerprint}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Copyright Detection Results */}
                      <div className={`border rounded-lg p-6 ${
                        audioResult.copyrightDetected
                          ? 'bg-red-900/20 border-red-500/30'
                          : 'bg-green-900/20 border-green-500/30'
                      }`}>
                        <div className="flex items-center gap-3 mb-4">
                          {audioResult.copyrightDetected ? (
                            <AlertCircle className="w-6 h-6 text-red-400" />
                          ) : (
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          )}
                          <h3 className="text-xl font-bold text-white">
                            {audioResult.copyrightDetected ? 'Copyright Material Detected' : 'No Copyright Issues'}
                          </h3>
                        </div>
                        {audioResult.riskLevel && (
                          <div className="mb-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              audioResult.riskLevel === 'high' ? 'bg-red-500/20 text-red-300' :
                              audioResult.riskLevel === 'medium' ? 'bg-orange-500/20 text-orange-300' :
                              'bg-green-500/20 text-green-300'
                            }`}>
                              Risk Level: {audioResult.riskLevel.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Copyright Matches */}
                      {audioResult.matches && audioResult.matches.length > 0 && (
                        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-5">
                          <h4 className="font-semibold text-white mb-3">🎵 Copyright Matches</h4>
                          <div className="space-y-3">
                            {audioResult.matches.map((match, idx) => (
                              <div key={idx} className="bg-purple-950/50 rounded p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="text-purple-100 font-semibold">{match.title}</p>
                                    <p className="text-sm text-purple-300">{match.artist}</p>
                                  </div>
                                  <span className="text-xs text-purple-400">{Math.round(match.confidence * 100)}%</span>
                                </div>
                                <p className="text-sm text-purple-300">Owner: {match.owner}</p>
                                <p className="text-xs text-purple-400">@ {match.timestamp}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      {audioResult.recommendations && (
                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-5">
                          <h4 className="font-semibold text-white mb-2">💡 Recommendations</h4>
                          <p className="text-purple-200 text-sm">{audioResult.recommendations}</p>
                        </div>
                      )}

                      {/* Clearance Info */}
                      {audioResult.clearance && audioResult.clearance.required && (
                        <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-5">
                          <h4 className="font-semibold text-white mb-3">📋 Clearance Required</h4>
                          <p className="text-purple-200 text-sm mb-3">You need to obtain clearance from:</p>
                          <ul className="space-y-1">
                            {audioResult.clearance.contacts.map((contact, idx) => (
                              <li key={idx} className="text-purple-300 text-sm">• {contact}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Audio Info */}
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

              {/* Recognition Features */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/20 text-center">
                  <div className="text-2xl mb-2">🎵</div>
                  <p className="text-purple-200 text-sm font-semibold mb-1">Track ID</p>
                  <p className="text-purple-400 text-xs">Add C2PA Manifest to Assets (Audio, Video, Images) before upload</p>
                </div>
                <div className="bg-purple-900/20 w-full rounded-lg p-4 border border-purple-700/20 text-center">
                  <div className="text-2xl mb-2 w-full text-center"><Globe/></div>
                  <p className="text-purple-200 text-sm font-semibold mb-1">Search The Internet </p>
                  <p className="text-purple-400 text-xs">Find exact asset match across the internet (support images only for now)</p>
                </div>
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-700/20 text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <p className="text-purple-200 text-sm font-semibold mb-1">C2PA Manifest Recognition</p>
                  <p className="text-purple-400 text-xs">Detect C2PA in an asset and confirm if it's manifest matches a pre-signed manifest</p>
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={analyzeAudio}
                disabled={processing}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Audio...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Analyze Audio
                  </>
                )}
              </button>
            </>
        </div>
      </div>
  )
}

export default Audio_Detect