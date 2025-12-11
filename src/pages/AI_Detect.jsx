import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Upload, Download, Eye, Shield, AlertCircle, CheckCircle, Loader2, Sparkles, Lock, Brain, Zap } from 'lucide-react';
import { downloadBase64 } from '../utils';


export default function AIWatermarkAndDetect() {
  const [mode, setMode] = useState('embed');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [watermarkedImage, setWatermarkedImage] = useState(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLog, setAiLog] = useState([]);
  const fileInputRef = useRef(null);


  const addLog = (message, type = 'info') => {
    setAiLog(prev => [...prev, { message, type, timestamp: new Date().toISOString() }]);
  };

  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        setWatermarkedImage(null);
        setAiLog([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const embedWatermarkWithAI = async () => {
    if (!watermarkText) {
      toast.error('Please enter watermark text');
      return;
    }
    if (!image || !watermarkText) {
      toast.error('Please upload an image and enter watermark text');
      return;
    }

    // setLoading(true);
    setAiLog([]);
    setWatermarkedImage(null);
    addLog('🚀 Initializing AI watermarking system...', 'info');
    
    try {
      addLog('📸 Converting image to base64...', 'info');
      const base64Image = await convertImageToBase64(imageFile);

      

      const response = await fetch("http://localhost:8000/watermark-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64_image: base64Image,
          watermark_hash: watermarkText,
        })
      });

      const result = await response.json();

      console.log("res",result.result)

      if (result.result.success) {
        addLog('✅ AI watermarking analysis complete!', 'success');
        
        setWatermarkedImage(result.result.watermarked_image);
      } else {
        addLog('❌ Error: ' + result.result.error, 'error');
        console.error('Watermarking error:', result.result.error);
      }
    } catch (err) {
      addLog('❌ Error: ' + err.message, 'error');
      console.error('Watermarking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const detectWatermarkWithAI = async () => {
    if (!image) {
      toast.error('Please upload an image to detect watermark');
      return;
    }

    setLoading(true);
    setAiLog([]);
    addLog('🔍 Starting AI-powered watermark detection...', 'info');

    try {
      addLog('📸 Converting image to base64...', 'info');
      const base64Image = await convertImageToBase64(imageFile);
      
      addLog('🤖 Sending to LLM Server for watermark detection...', 'info');
      addLog('🔎 AI is analyzing image for hidden watermarks...', 'info');

      const response = await fetch("http://localhost:8000/verify-watermark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64_image: base64Image,
          watermark_hash: watermarkText,
        })
      });

      const result = await response.json();

      setDetectionResult(result);
      console.log(result)

      if (result.success) {
        addLog('✅ AI watermarking verification completed!', 'success');
      }

    } catch (err) {
      addLog('❌ Error: ' + err.message, 'error');
      console.error('Detection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!watermarkedImage) return;
    const link = document.createElement('a');
    link.download = 'ai-watermarked-image.png';
    link.href = watermarkedImage;
    link.click();
  };

  return (
  <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-8">
          <div className="flex text-slate-200 items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12  animate-pulse" />
            <h1 className="text-5xl font-bold">
              AI-Powered Watermarking
            </h1>
          </div>
          <p className="text-slate-400 text-sm md:text-lg">AI strategy + Canvas processing = Real watermarks</p>
          <div className="flex text-slate-400 items-center justify-center gap-2 mt-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-xs md:text-sm text-slate-300">AI-guided • Canvas-powered • Fully functional</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 mb-6 border border-slate-500/20">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {setMode('embed'); setAiLog([]); setImage(null)}}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                mode === 'embed'
                 ? 'bg-white text-black'
                      : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Upload className="inline-block w-5 h-5 mr-2" />
              AI Embed
            </button>
            <button
              onClick={() => {setMode('detect'); setAiLog([]); setImage(null)}}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                mode === 'detect'
                  ? 'bg-white text-black  scale-105'
                      : 'bg-slate-700/50 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <Eye className="inline-block w-5 h-5 mr-2" />
              AI Verify
            </button>
          </div>

          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="w-full py-4 border-2 border-dashed border-slate-500/50 rounded-lg hover:border-slate-400 transition-all hover:bg-slate-500/10 bg-slate-700/30"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-slate-200 font-medium">Click to upload image</p>
              <p className="text-sm text-slate-300/70 mt-1">PNG, JPG, WEBP up to 10MB</p>
            </button>
          </div>

          {image && (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-slate-500/20 mb-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Original Image</h3>
              <img src={image} alt="Original" className="w-[40%] rounded-lg border border-slate-500/30" />
            </div>
          )}

          {mode === 'embed' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-slate-400" />
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter text to embed (e.g., © 2024 Your Company)"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-500/30 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-white placeholder-slate-300/50"
                />
              </div>

              <div className="p-4 bg-slate-500/10 border border-slate-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div className="text-sm text-slate-200">
                    <p className="font-semibold mb-1">AI-Powered Embedding</p>
                    <p className="text-slate-300/80">Our Local LM Server AI model will analyze your image and embed the watermark using optimal techniques (LSB, DCT, or hybrid approach).</p>
                  </div>
                </div>
              </div>

              <button
                onClick={embedWatermarkWithAI}
                disabled={loading || !image}
                className="w-full cursor-pointer bg-slate-600 text-white py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-700 transition-all disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-slate-500/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI Processing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Let AI Embed Watermark
                  </>
                )}
              </button>
            </div>
          )}

          {mode === 'detect' && (
            <>
              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-slate-400" />
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter text to verify against hidden watermark"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-500/30 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-white placeholder-slate-300/50"
                />
              </div>
            
              <div className="p-4 mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div className="text-sm text-blue-200">
                    <p className="font-semibold mb-1">AI-Powered Detection/Verification</p>
                    <p className="text-blue-300/80">Our Local LM Server Model will analyze the image using advanced pattern recognition to detect and extract hidden watermarks.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={detectWatermarkWithAI}
                disabled={loading || !image}
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-pink-700 transition-all disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-slate-500/30"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Let AI Detect Watermark
                  </>
                )}
              </button>
            </>
          )}

          <div className="w-full mt-6">

          {mode === 'embed' && watermarkedImage && (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-slate-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-200">AI Analysis</h3>
                {watermarkedImage && (
                  <button
                    onClick={() => downloadBase64(watermarkedImage, "watermarked_output")}
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-linear-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-300 mb-2">Watermark Embedded Successfully!</p>
                      {/* <p className="text-sm text-green-200/80">{detectionResult.details.watermarked_image_description}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {detectionResult && mode === 'detect' && (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-slate-500/20">
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Verification Result</h3>
              
              {detectionResult.verified ? (
                <div className="space-y-4">
                  <div className="p-4 bg-linear-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-500/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-blue-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-blue-300 text-lg mb-2">Image Verified!</p>
                          <div className="bg-slate-900/50 p-3 rounded border border-blue-500/30 mb-3">
                            <p className="font-mono text-lg text-white break-all">Embedded watermark matches</p>
                          </div>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-6 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-300 mb-2">No Watermark Detected OR Watermark text doesn't match</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          </div>

          {aiLog.length > 0 && (
            <div className="mt-6 bg-slate-900/80 rounded-lg p-4 max-h-64 overflow-y-auto border border-slate-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                <p className="text-sm font-mono text-slate-300">AI Processing Log</p>
              </div>
              {aiLog.map((log, idx) => (
                <div key={idx} className={`text-xs font-mono mb-1 ${
                  log.type === 'success' ? 'text-green-400' :
                  log.type === 'error' ? 'text-red-400' :
                  log.type === 'warning' ? 'text-yellow-400' :
                  'text-slate-300'
                }`}>
                  {log.message}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}