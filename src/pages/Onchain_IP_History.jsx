import React, { useState } from 'react';
import { Search, FileText, Shield, Users, GitBranch, Network, ChevronDown, ChevronUp, Copy, Play, Pause, Volume2, VolumeX, Music, Radio, MoreVertical, Download } from 'lucide-react';
import Header from '../components/header';
import toast, { Toaster } from 'react-hot-toast';
<<<<<<< HEAD
import { fetchIPByIpId, fetchIPTips } from '../queries';
import { formatDate, getTokenMetadata } from '../utils';
import { mockIPAssets } from '../utils/mockData';
=======
import { fetchAPIdata } from '../queries/api_queries';
import {IPAssetLoadingSkeleton} from '../components/SkeletonLoader';

>>>>>>> b855bf92b338fde76d22c70714a1e4a5e1af12fb

const Onchain_IP_History = () => {
  const [assetId, setAssetId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assetData, setAssetData] = useState(null);
<<<<<<< HEAD
  const [tipsPage, setTipsPage] = useState(1);
  const [revenueClaimsPage, setRevenueClaimsPage] = useState(1);
  const itemsPerPage = 5;
=======
  const [mediaLoading, setMediaLoading] = useState(false);
>>>>>>> b855bf92b338fde76d22c70714a1e4a5e1af12fb

  const handleFetchAsset = async () => {
    if (!assetId.trim()) {
      toast.error('Please enter an IP Asset ID');
      return;
    }

    setIsLoading(true);
    setAssetData(null);
    setMediaLoading(true);

    try {
<<<<<<< HEAD
      const data2 = await fetchIPByIpId(assetId.toLowerCase());
      const tips = await fetchIPTips(assetId.toLowerCase());
      if (data2.metadata === undefined) {
=======
      const data = await fetchAPIdata(assetId.toLowerCase());
      if (!data) {
>>>>>>> b855bf92b338fde76d22c70714a1e4a5e1af12fb
        toast.error("No IP Asset found with this address");
        setIsLoading(false);
        return;
      }
<<<<<<< HEAD
      // const data = await fetchIPAssetData(assetId.trim());
      setAssetData({"metadata":data2.metadata, "tokenOwner":data2.tokenOwner, "isIPDisputed":data2.isIPDisputed, "tips":tips});

      setTipsPage(1);
      setRevenueClaimsPage(1);
      toast.success('IP Asset data loaded successfully!');
    } catch (error) {
      console.log("error", error)
      toast.error('IP Asset not found. Please enter a valid IP Asset ID.');
=======
      
      setAssetData(data);
      console.log("Asset data loaded:", data);
      toast.success('IP Asset data loaded successfully!');
    } catch (error) {
      console.log(error);
      toast.error('IP Asset not found. Ensure you used the right IP ID');
>>>>>>> b855bf92b338fde76d22c70714a1e4a5e1af12fb
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchAsset();
    }
  };

    // Pagination helpers
    const paginateData = (data, page) => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    };
  
    const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="text-purple-400" size={48} />
            <h1 className="text-4xl font-bold text-slate-200">Story IP Tracker</h1>
          </div>
          <p className="text-slate-400 text-lg">Track and monitor IP assets registered on STORY protocol.</p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg">
            <label className="block text-slate-300 font-medium mb-3">Enter IP Asset ID</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="e.g.,0x70967f61f7770E14d26E0b14A2C698a1e2AC344B,"
                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <button
                onClick={handleFetchAsset}
                disabled={isLoading || !assetId.trim()}
                className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed"
              >
                <Search size={20} />
                {isLoading ? 'Fetching...' : 'Fetch'}
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-3">Try: 0x4EeD6E09A4343B72b7E8aD6449f35C91868b2730,  A- 0x6E382247EA4C158005573B304425C614C6eBa9c0, I - 0x70967f61f7770E14d26E0b14A2C698a1e2AC344B</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <IPAssetLoadingSkeleton />}

        {/* Asset Data Display */}
        {!isLoading && assetData && (
<<<<<<< HEAD
          <div className="space-y-6 animate-fadeIn max-w-6xl mx-auto">
            {/* Metadata Card - Reduced Width */}
            <div className='flex w-full gap-6'>
            <MetadataCard metadata={assetData.metadata} tokenOwner={assetData.tokenOwner} isIPDisputed={assetData.isIPDisputed}  />
            <LicenseCard license={mockIPAssets["IP-001"].license}  />
            </div>

            {/* Tips Table */}
            <TipsTable 
              tips={assetData.tips} 
              currentPage={tipsPage}
              setCurrentPage={setTipsPage}
              paginatedTips={paginateData(assetData.tips, tipsPage)}
              totalPages={totalPages(assetData.tips)}
            />

            {/* Revenue Claims Table */}
            {/* <RevenueClaimsTable 
              claims={assetData.revenueClaims}
              currentPage={revenueClaimsPage}
              setCurrentPage={setRevenueClaimsPage}
              paginatedClaims={paginateData(assetData.revenueClaims, revenueClaimsPage)}
              totalPages={totalPages(assetData.revenueClaims)}
            /> */}
=======
          <div className="space-y-6 animate-fadeIn">
            {/* Media Display and Relationship Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MediaDisplay 
                nftMetadata={assetData.nftMetadata}
                mediaLoading={mediaLoading}
                setMediaLoading={setMediaLoading}
              />
              <RelationshipStats 
                parentsCount={assetData.parentsCount}
                ancestorsCount={assetData.ancestorsCount}
                childrenCount={assetData.childrenCount}
                descendantsCount={assetData.descendantsCount}
                isInGroup={assetData.isInGroup}
              />
            </div>

            {/* Metadata and License Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Metadata Card */}
              <MetadataCard key="metadata-card" assetData={assetData} />
              
              {/* License Details Card */}
              {assetData.licenses && assetData.licenses.length > 0 && (
                <LicenseDetailsCard 
                  key="license-card"
                  license={assetData.licenses[assetData.licenses.length - 1]} 
                  licenseCount={assetData.licenses.length}
                />
              )}
            </div>
>>>>>>> b855bf92b338fde76d22c70714a1e4a5e1af12fb
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !assetData && (
          <div className="text-center py-20">
            <FileText className="mx-auto mb-4 text-purple-400/50" size={64} />
            <h2 className="text-2xl font-bold text-slate-300 mb-2">No Asset Selected</h2>
            <p className="text-slate-500">Enter an IP Asset ID above to view its details</p>
          </div>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
// Metadata Card Component
const MetadataCard = ({ metadata, tokenOwner, isIPDisputed }) => (
  <div className="w-full bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all">
    <div className="flex items-center justify-between mb-6">
      <div className='flex items-center gap-3'>
        <Shield className="text-purple-400" size={28} />
        <h3 className="text-2xl font-bold text-slate-200">Asset Metadata</h3>
      </div>
      {isIPDisputed &&
        <span className={`px-4 py-2 rounded-full text-sm font-semibold border bg-red-500/20 text-red-400 border-red-500/30`}>
          Disputed
        </span>
=======
// Media Display Component
const MediaDisplay = ({ nftMetadata, mediaLoading, setMediaLoading }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setIsMuted] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const [playbackRate, setPlaybackRate] = React.useState(1);
  const mediaRef = React.useRef(null);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.menu-container')) {
        setShowMenu(false);
>>>>>>> b855bf92b338fde76d22c70714a1e4a5e1af12fb
      }
    };

<<<<<<< HEAD
// License Card Component
const LicenseCard = ({ license }) => (
  <div className="w-full bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg hover:shadow-xl hover:border-purple-500/30 transition-all">
    <div className="flex items-center gap-2 mb-6">
      <Shield className="text-purple-400" size={24} />
      <h3 className="text-xl font-bold text-slate-200">License Details</h3>
    </div>
    <div className="space-y-4">
      <InfoRow label="License Type" value={license.licenseType} />
      <InfoRow 
        label="Status" 
        value={license.licenseStatus} 
        badge 
        badgeColor={license.licenseStatus === 'Active' ? 'green' : 'red'}
      />
      <InfoRow label="Expires" value={license.expirationDate} icon={<Calendar size={16} />} />
      <InfoRow label="Territory" value={license.territory} />
      <InfoRow label="Terms" value={license.terms} fullWidth />
      <InfoRow label="Royalty Rate" value={license.royaltyRate} highlight />
    </div>
  </div>
);
=======
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMenu]);
>>>>>>> b855bf92b338fde76d22c70714a1e4a5e1af12fb

  // Extract media info from nftMetadata
  const getMediaInfo = () => {
    if (!nftMetadata) return { url: null, type: null };

    // Priority 1: Check animation field (for video/audio) - prefer cachedUrl over originalUrl
    if (nftMetadata.animation?.contentType) {
      const url = nftMetadata.animation.cachedUrl || nftMetadata.animation.originalUrl;
      if (url) {
        return {
          url: url,
          type: nftMetadata.animation.contentType
        };
      }
    }

    // Priority 2: Check image field (for images) - prefer cachedUrl over originalUrl
    if (nftMetadata.image?.contentType) {
      const url = nftMetadata.image.cachedUrl || nftMetadata.image.originalUrl;
      if (url) {
        return {
          url: url,
          type: nftMetadata.image.contentType
        };
      }
    }

    // Priority 3: Fallback to raw.metadata.mediaUrl (video/audio fallback)
    if (nftMetadata.raw?.metadata?.mediaUrl && nftMetadata.raw?.metadata?.mediaType) {
      return {
        url: nftMetadata.raw.metadata.mediaUrl,
        type: nftMetadata.raw.metadata.mediaType
      };
    }

    // Priority 4: Fallback to raw.metadata.animation_url (video/audio IPFS)
    if (nftMetadata.raw?.metadata?.animation_url && nftMetadata.raw?.metadata?.mediaType) {
      // Convert IPFS URI to HTTP URL
      const url = nftMetadata.raw.metadata.animation_url.startsWith('ipfs://')
        ? nftMetadata.raw.metadata.animation_url.replace('ipfs://', 'https://ipfs.io/ipfs/')
        : nftMetadata.raw.metadata.animation_url;
      return {
        url: url,
        type: nftMetadata.raw.metadata.mediaType
      };
    }

    // Priority 5: Fallback to raw.metadata.image (image IPFS)
    if (nftMetadata.raw?.metadata?.image && nftMetadata.raw?.metadata?.mediaType) {
      // Convert IPFS URI to HTTP URL
      const url = nftMetadata.raw.metadata.image.startsWith('ipfs://')
        ? nftMetadata.raw.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
        : nftMetadata.raw.metadata.image;
      return {
        url: url,
        type: nftMetadata.raw.metadata.mediaType
      };
    }

    // No media available
    return { url: null, type: null };
  };

  const { url: originalURL, type: contentType } = getMediaInfo();

  setMediaLoading(false);

  const renderMedia = () => {
    if (!originalURL) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
          <FileText size={64} className="opacity-50" />
          <p className="ml-4 text-lg">No media available</p>
          <div className="text-xs text-red-400 bg-red-900/20 p-4 rounded">
            <p>Debug: URL is {originalURL === null ? 'null' : originalURL === undefined ? 'undefined' : 'empty'}</p>
            <p>Type: {contentType || 'N/A'}</p>
          </div>
        </div>
      );
    }
    const type = contentType?.toLowerCase() || '';

    if (type.includes('image')) {
      console.log('📸 Rendering IMAGE');

      return (
        <img 
          src={originalURL} 
          alt="IP Asset" 
          className="w-full h-full object-contain rounded-lg"
          crossOrigin="anonymous"
          onLoad={() => {
            console.log('Image loaded successfully:', originalURL);
            setMediaLoading(false);
          }}
          onError={(e) => {
            console.error('Image error:', e, 'URL:', originalURL);
            setMediaLoading(false);
            toast.error('Failed to load image. Check console for details.');
          }}
        />
      );
    }

    if (type.includes('video')) {
      console.log('🎬 Rendering VIDEO element');
      return (
        <video 
          ref={mediaRef}
          src={originalURL}
          className="w-full h-full min-h-[500px] object-contain rounded-lg"
          crossOrigin="anonymous"
          playsInline
          preload="metadata"
          controls
            onClick={(e) => {
              e.stopPropagation();
              console.log('Video clicked');
            }}
            onLoadedData={() => {
              console.log('✅ Video loaded successfully:', originalURL);
              console.log('Video duration:', mediaRef.current?.duration);
              console.log('Video dimensions:', mediaRef.current?.videoWidth, 'x', mediaRef.current?.videoHeight);
              setMediaLoading(false);
            }}
            onError={(e) => {
              console.error('❌ Video error:', e);
              console.error('Error details:', e.target.error);
              console.error('URL:', originalURL);
              setMediaLoading(false);
              toast.error('Failed to load video. Check console for details.');
            }}
            onLoadStart={() => console.log('🔄 Video loading started:', originalURL)}
            onCanPlay={() => console.log('✅ Video can play')}
            onPlay={() => {
              console.log('▶️ Video is playing');
              setIsPlaying(true);
            }}
            onPause={() => {
              console.log('⏸️ Video is paused');
              setIsPlaying(false);
            }}
          />
      );
    }

    if (type.includes('audio')) {
      console.log('🎵 Rendering AUDIO element');
      
      const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      };

      const handlePlayPause = () => {
        if (mediaRef.current) {
          if (isPlaying) {
            mediaRef.current.pause();
          } else {
            mediaRef.current.play()
              .then(() => setIsPlaying(true))
              .catch(err => console.error('Play error:', err));
          }
        }
      };

      const handleTimeUpdate = () => {
        if (mediaRef.current) {
          setCurrentTime(mediaRef.current.currentTime);
        }
      };

      const handleLoadedMetadata = () => {
        if (mediaRef.current) {
          setDuration(mediaRef.current.duration);
        }
      };

      const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        const newTime = percentage * duration;
        if (mediaRef.current) {
          mediaRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }
      };

      const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (mediaRef.current) {
          mediaRef.current.volume = newVolume;
        }
        if (newVolume === 0) {
          setIsMuted(true);
        } else {
          setIsMuted(false);
        }
      };

      const toggleMute = () => {
        if (mediaRef.current) {
          if (isMuted) {
            mediaRef.current.volume = volume || 0.5;
            setVolume(volume || 0.5);
            setIsMuted(false);
          } else {
            mediaRef.current.volume = 0;
            setIsMuted(true);
          }
        }
      };

      return (
        <div className="relative w-full h-full min-h-[400px] bg-linear-to-br from-purple-900/40 to-pink-900/40 rounded-lg overflow-hidden flex flex-col items-center justify-center p-8">
          {/* Hidden audio element */}
          <audio 
            ref={mediaRef}
            src={originalURL}
            crossOrigin="anonymous"
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={() => {
              console.log('✅ Audio loaded successfully:', originalURL);
              setMediaLoading(false);
            }}
            onError={(e) => {
              console.error('❌ Audio error:', e);
              setMediaLoading(false);
              toast.error('Failed to load audio');
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Music Icon Display */}
          <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-2xl">
            <div className="relative">
              {/* Animated background circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-purple-500/20 rounded-full animate-ping"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-purple-500/30 rounded-full animate-pulse"></div>
              </div>
              {/* Music icon */}
              <div className="relative text-purple-400">
                <Music size={80} strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Audio info */}
            <div className="text-center">
              <p className="text-purple-300 font-medium text-lg">Audio File</p>
              <p className="text-slate-400 text-sm">High Quality Audio</p>
            </div>

            {/* Custom Audio Controls */}
            <div className="w-full space-y-4 bg-black/40 rounded-2xl p-6 backdrop-blur-sm">
              {/* Timeline */}
              <div className="space-y-2">
                <div 
                  className="relative h-2 bg-gray-700 rounded-full cursor-pointer group"
                  onClick={handleSeek}
                >
                  <div 
                    className="absolute h-full bg-white rounded-full transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
                  />
                </div>
                {/* Time display */}
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="w-14 h-14 flex items-center justify-center bg-white hover:bg-gray-100 text-black rounded-full transition-all shadow-lg"
                >
                  {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-3 flex-1 ml-6">
                  <button 
                    onClick={toggleMute}
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>

                {/* Three-dot Menu */}
                <div className="relative ml-4 menu-container">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-white hover:text-purple-400 transition-colors p-2 rounded-full hover:bg-white/10"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div 
                      className="absolute right-0 bottom-full mb-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Download Option */}
                      <a
                        href={originalURL}
                        download
                        className="flex items-center gap-3 px-4 py-2 text-white hover:bg-slate-700 transition-colors"
                        onClick={() => setShowMenu(false)}
                      >
                        <Download size={16} />
                        <span className="text-sm">Download</span>
                      </a>

                      {/* Playback Speed */}
                      <div className="px-4 py-2 text-slate-400 text-xs font-semibold uppercase tracking-wider border-t border-slate-700 mt-2 pt-3">
                        Playback Speed
                      </div>
                      {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => {
                            setPlaybackRate(speed);
                            if (mediaRef.current) {
                              mediaRef.current.playbackRate = speed;
                            }
                            setShowMenu(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            playbackRate === speed
                              ? 'text-purple-400 bg-slate-700/50'
                              : 'text-white hover:bg-slate-700'
                          }`}
                        >
                          {speed === 1 ? 'Normal' : `${speed}x`}
                          {playbackRate === speed && (
                            <span className="float-right">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <FileText size={64} className="opacity-50" />
        <p className="ml-4">Unsupported media type</p>
      </div>
    );
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all min-h-[600px]">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="text-purple-400" size={24} />
        <h3 className="text-xl font-bold text-slate-200">Media Preview</h3>
      </div>
      
      <div className="relative bg-slate-900/50 rounded-lg overflow-hidden min-h-[500px] flex items-center justify-center">
        {mediaLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
            <p className="text-slate-400 text-sm">Loading media...</p>
          </div>
        ) : (
          renderMedia()
        )}
      </div>
    </div>
  );
};

// Metadata Card Component
const MetadataCard = ({ assetData }) => {
  const [showAllMetadataFields, setShowAllMetadataFields] = React.useState(false);
  const [expandedMetadataFields, setExpandedMetadataFields] = React.useState({});

  const toggleMetadataField = (key) => {
    setExpandedMetadataFields(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  // Define all metadata fields
  const allFields = [
    { label: 'IP ID', value: assetData.id, key: 'ipId' },
    { label: 'Name', value: assetData.nftMetadata?.name, key: 'name' },
    { label: 'Description', value: assetData.nftMetadata?.raw?.metadata?.description, key: 'description' },
    { label: 'Created At', value: assetData.createdAt ? new Date(assetData.createdAt).toLocaleString() : 'N/A', key: 'createdAt' },
    { label: 'Last Updated At', value: assetData.lastUpdatedAt ? new Date(assetData.lastUpdatedAt).toLocaleString() : 'N/A', key: 'lastUpdatedAt' },
    { label: 'Total Supply', value: assetData.totalSupply || assetData.nftMetadata?.totalSupply, key: 'totalSupply' },
    { label: 'Chain ID', value: assetData.chainId, key: 'chainId' },
    { label: 'Token Contract', value: assetData.nftMetadata?.tokenContract, key: 'tokenContract' },
    { label: 'Token ID', value: assetData.nftMetadata?.tokenId, key: 'tokenId' },
    { label: 'Token Type', value: assetData.nftMetadata?.tokenType, key: 'tokenType' },
    { label: 'Block Number', value: assetData.blockNumber, key: 'blockNumber' },
    { label: 'Block Timestamp', value: assetData.blockTimestamp ? new Date(assetData.blockTimestamp).toLocaleString() : 'N/A', key: 'blockTimestamp' },
    { label: 'Content Type', value: assetData.nftMetadata?.image?.contentType || assetData.nftMetadata?.animation?.contentType, key: 'contentType' },
    { label: 'Creator', value: assetData.nftMetadata?.raw?.metadata?.creator, key: 'creator' },
  ];

  // Filter out fields with null/undefined values
  const validFields = allFields.filter(field => field.value !== null && field.value !== undefined && field.value !== '');

  // Show first 6 fields or all fields based on state
  const fieldsToShow = showAllMetadataFields ? validFields : validFields.slice(0, 6);
  const hasMoreFields = validFields.length > 6;

  const renderField = (field) => {
    const isExpanded = expandedMetadataFields[field.key];
    const isLong = field.value && field.value.toString().length > 50;
    
    return (
      <div key={field.key} className="bg-slate-900/30 rounded-lg p-4 hover:bg-slate-900/50 transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm font-medium">{field.label}</span>
          <div className="flex items-center gap-2">
            {isLong && (
              <button
                onClick={() => toggleMetadataField(field.key)}
                className="text-purple-400 hover:text-purple-300 text-xs transition-colors flex items-center gap-1"
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
            )}
            <button
              onClick={() => copyToClipboard(field.value?.toString() || '')}
              className="text-purple-400 hover:text-purple-300 transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
        <div className={`text-slate-200 text-sm font-mono break-all ${!isExpanded && isLong ? 'line-clamp-2' : ''}`}>
          {field.value?.toString() || 'N/A'}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-purple-400" size={24} />
        <h3 className="text-xl font-bold text-slate-200">Metadata</h3>
      </div>
      
      <div className="space-y-3">
        {fieldsToShow.map(field => renderField(field))}
        
        {/* Show More/Less Button */}
        {hasMoreFields && (
          <button
            onClick={() => setShowAllMetadataFields(!showAllMetadataFields)}
            className="w-full mt-4 py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-purple-300 font-medium transition-all flex items-center justify-center gap-2"
          >
            {showAllMetadataFields ? (
              <>
                <ChevronUp size={20} />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                Show More ({validFields.length - 6} more fields)
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
// Tips Table Component
const TipsTable = ({ tips, currentPage, setCurrentPage, paginatedTips, totalPages }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg">
    <div className="flex items-center gap-2 mb-6">
      <DollarSign className="text-purple-400" size={24} />
      <h3 className="text-xl font-bold text-slate-200">Royalty Received</h3>
      <span className="ml-auto bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
        {tips.length} Total
      </span>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700/50">
            <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
              <div className="flex items-center gap-1">
                <User size={14} />
                Sender
              </div>
            </th>
            <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
              <div className="flex items-center gap-1">
                Amount
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTips.map((tip) => (
            <tr key={tip.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
              <td className="py-4 px-2">
                <div>
                  {/* <div className="text-slate-200 font-medium">{tip.sender}</div> */}
                  <div className="text-slate-500 text-xs font-mono">{tip.sender.slice(0, 10)}...{tip.sender.slice(-8)}</div>
                </div>
              </td>
              <td className="py-4 px-2">
                <span className="text-purple-400 font-bold">{tip.amountAfterFee} {getTokenMetadata(tip.receiverIpId)?.symbol}</span>
              </td>
              {/* <td className="py-4 px-2 text-slate-300">{tip.date}</td>
              <td className="py-4 px-2">
                <a 
                  href={`https://etherscan.io/tx/${tip.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm font-mono"
                >
                  {tip.transactionHash.slice(0, 10)}...
                  <ExternalLink size={12} />
                </a>
              
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      totalItems={tips.length}
    />
  </div>
);

// Revenue Claims Table Component
const RevenueClaimsTable = ({ claims, currentPage, setCurrentPage, paginatedClaims, totalPages }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg">
    <div className="flex items-center gap-2 mb-6">
      <TrendingUp className="text-purple-400" size={24} />
      <h3 className="text-xl font-bold text-slate-200">Revenue Claims</h3>
      <span className="ml-auto bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
        {claims.length} Total
      </span>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700/50">
            <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
              <div className="flex items-center gap-1">
                <User size={14} />
                Claimer
              </div>
            </th>
            <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
              <div className="flex items-center gap-1">
                <DollarSign size={14} />
                Amount
              </div>
            </th>
            <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                Date
              </div>
            </th>
            <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {paginatedClaims.map((claim) => (
            <tr key={claim.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
              <td className="py-4 px-2">
                <div>
                  <div className="text-slate-200 font-medium">{claim.claimerName}</div>
                  <div className="text-slate-500 text-xs font-mono">{claim.claimer.slice(0, 10)}...{claim.claimer.slice(-8)}</div>
                </div>
              </td>
              <td className="py-4 px-2">
                <span className="text-green-400 font-bold">{claim.amount}</span>
              </td>
              <td className="py-4 px-2 text-slate-300">{claim.date}</td>
              <td className="py-4 px-2">
                <span className="text-slate-400 text-sm">{claim.purpose}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <Pagination 
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      totalItems={claims.length}
    />
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange, totalItems }) => {
  const itemsPerPage = 5;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
=======
// Relationship Stats Component
const RelationshipStats = ({ parentsCount, ancestorsCount, childrenCount, descendantsCount, isInGroup }) => {
  const stats = [
    { label: 'Parents', value: parentsCount ?? 0, icon: <Users size={20} />, color: 'text-blue-400' },
    { label: 'Ancestors', value: ancestorsCount ?? 0, icon: <GitBranch size={20} />, color: 'text-purple-400' },
    { label: 'Children', value: childrenCount ?? 0, icon: <Network size={20} />, color: 'text-green-400' },
    { label: 'Descendants', value: descendantsCount ?? 0, icon: <GitBranch size={20} className="rotate-180" />, color: 'text-pink-400' },
  ];
>>>>>>> b855bf92b338fde76d22c70714a1e4a5e1af12fb

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <Network className="text-purple-400" size={28} />
        <h3 className="text-2xl font-bold text-slate-200">Relationship Stats</h3>
      </div>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-900/30 rounded-lg p-4 hover:bg-slate-900/50 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={stat.color}>{stat.icon}</span>
                <span className="text-slate-300 font-medium">{stat.label}</span>
              </div>
              <span className="text-2xl font-bold text-purple-300">{stat.value}</span>
            </div>
          </div>
        ))}
        
        <div className="bg-slate-900/30 rounded-lg p-4 hover:bg-slate-900/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-yellow-400" size={20} />
              <span className="text-slate-300 font-medium">In Group</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isInGroup 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
            }`}>
              {isInGroup ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// License Details Card Component  
const LicenseDetailsCard = ({ license, licenseCount }) => {
  const [showAllLicenseFields, setShowAllLicenseFields] = React.useState(false);
  const [expandedLicenseFields, setExpandedLicenseFields] = React.useState({});

  const toggleLicenseField = (key) => {
    setExpandedLicenseFields(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const renderField = (label, value, key) => {
    const isExpanded = expandedLicenseFields[key];
    const isLong = value && value.toString().length > 50;
    
    return (
      <div key={key} className="bg-slate-900/30 rounded-lg p-4 hover:bg-slate-900/50 transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm font-medium">{label}</span>
          <div className="flex items-center gap-2">
            {isLong && (
              <button
                onClick={() => toggleLicenseField(key)}
                className="text-purple-400 hover:text-purple-300 text-xs transition-colors flex items-center gap-1"
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
            )}
            <button
              onClick={() => copyToClipboard(value?.toString() || '')}
              className="text-purple-400 hover:text-purple-300 transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
        <div className={`text-slate-200 text-sm font-mono break-all ${!isExpanded && isLong ? 'line-clamp-2' : ''}`}>
          {value?.toString() || 'N/A'}
        </div>
      </div>
    );
  };

  // Define all license fields (License Count is now first)
  const allFields = [
    { label: 'License Count', value: licenseCount, key: 'licenseCount' },
    { label: 'License Terms ID', value: license.licenseTermsId, key: 'termsId' },
    { label: 'License Template ID', value: license.licenseTemplateId, key: 'templateId' },
    { label: 'Template Name', value: license.templateName, key: 'templateName' },
    { label: 'Currency', value: license.terms?.currency, key: 'currency' },
    { label: 'Royalty Policy', value: license.terms?.royaltyPolicy, key: 'royaltyPolicy' },
    { label: 'Default Minting Fee', value: license.terms?.defaultMintingFee, key: 'mintingFee' },
    { label: 'Commercial Rev Share', value: license.terms?.commercialRevShare ? `${license.terms.commercialRevShare}%` : '0%', key: 'commercialRevShare' },
    { label: 'Commercial Rev Ceiling', value: license.terms?.commercialRevCeiling || '0', key: 'commercialRevCeiling' },
    { label: 'Derivative Rev Ceiling', value: license.terms?.derivativeRevCeiling || '0', key: 'derivativeRevCeiling' },
    { label: 'Expiration', value: license.terms?.expiration || '0', key: 'expiration' },
  ];

  // Filter out fields with null/undefined values
  const validFields = allFields.filter(field => field.value !== null && field.value !== undefined && field.value !== '');

  // Show first 6 fields or all fields
  const fieldsToShow = showAllLicenseFields ? validFields : validFields.slice(0, 6);
  const hasMoreFields = validFields.length > 6;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-purple-400" size={24} />
        <h3 className="text-xl font-bold text-slate-200">License Details</h3>
      </div>
      
      <div className="space-y-3">
        {fieldsToShow.map(field => renderField(field.label, field.value, field.key))}
        
        {/* Boolean Fields - Always visible if terms exist */}
        {license.terms && showAllLicenseFields && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <BooleanField label="Transferable" value={license.terms.transferable} />
            <BooleanField label="Commercial Use" value={license.terms.commercialUse} />
            <BooleanField label="Derivatives Allowed" value={license.terms.derivativesAllowed} />
            <BooleanField label="Derivatives Approval" value={license.terms.derivativesApproval} />
            <BooleanField label="Commercial Attribution" value={license.terms.commercialAttribution} />
            <BooleanField label="Derivatives Reciprocal" value={license.terms.derivativesReciprocal} />
            <BooleanField label="Derivatives Attribution" value={license.terms.derivativesAttribution} />
          </div>
        )}
        
        {/* Show More/Less Button */}
        {hasMoreFields && (
          <button
            onClick={() => setShowAllLicenseFields(!showAllLicenseFields)}
            className="w-full mt-4 py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-purple-300 font-medium transition-all flex items-center justify-center gap-2"
          >
            {showAllLicenseFields ? (
              <>
                <ChevronUp size={20} />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                Show More ({validFields.length - 6} more fields)
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// Boolean Field Component
const BooleanField = ({ label, value }) => (
  <div className="bg-slate-900/30 rounded-lg p-4">
    <span className="text-slate-400 text-sm font-medium">{label}</span>
    <div className="mt-1">
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
        value 
          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
          : 'bg-red-500/20 text-red-400 border border-red-500/30'
      }`}>
        {value ? 'Yes' : 'No'}
      </span>
    </div>
  </div>
);

export default Onchain_IP_History;