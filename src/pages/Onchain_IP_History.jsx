import React, { useState } from 'react';
import { Search, FileText, Shield, TrendingUp, DollarSign, Calendar, User, Hash, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../components/header';
import { IPAssetLoadingSkeleton } from '../components/SkeletonLoader';
import { fetchIPAssetData } from '../utils/mockData';
import toast, { Toaster } from 'react-hot-toast';
import { fetchIPByIpId } from '../queries';

const Onchain_IP_History = () => {
  const [assetId, setAssetId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assetData, setAssetData] = useState(null);
  const [tipsPage, setTipsPage] = useState(1);
  const [revenueClaimsPage, setRevenueClaimsPage] = useState(1);
  const itemsPerPage = 5;

  const handleFetchAsset = async () => {
    if (!assetId.trim()) {
      toast.error('Please enter an IP Asset ID');
      return;
    }

    setIsLoading(true);
    setAssetData(null);

    try {
      const data2 = await fetchIPByIpId(assetId.toLowerCase());
      console.log("data", data2)
      // const data = await fetchIPAssetData(assetId.trim());
      setAssetData({"metadata":data2.metadata, tokenOwner:data2.tokenOwner});
      setTipsPage(1);
      setRevenueClaimsPage(1);
      toast.success('IP Asset data loaded successfully!');
    } catch (error) {
      toast.error('IP Asset not found. Try IP-001, IP-002, or IP-003');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
                placeholder="e.g., IP-001, IP-002, IP-003"
                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <button
                onClick={handleFetchAsset}
                disabled={isLoading || !assetId.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed"
              >
                <Search size={20} />
                {isLoading ? 'Fetching...' : 'Fetch'}
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-3">Try: IP-001, IP-002, or IP-003</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <IPAssetLoadingSkeleton />}

        {/* Asset Data Display */}
        {!isLoading && assetData && (
          <div className="space-y-6 animate-fadeIn">
            {/* Metadata and License Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Metadata Card */}
              <MetadataCard metadata={assetData.metadata} tokenOwner={assetData.tokenOwner} />
              
              {/* License Card */}
              {/* <LicenseCard license={assetData.license} /> */}
            </div>

            {/* Tips Table */}
            {/* <TipsTable 
              tips={assetData.tips} 
              currentPage={tipsPage}
              setCurrentPage={setTipsPage}
              paginatedTips={paginateData(assetData.tips, tipsPage)}
              totalPages={totalPages(assetData.tips)}
            /> */}

            {/* Revenue Claims Table */}
            {/* <RevenueClaimsTable 
              claims={assetData.revenueClaims}
              currentPage={revenueClaimsPage}
              setCurrentPage={setRevenueClaimsPage}
              paginatedClaims={paginateData(assetData.revenueClaims, revenueClaimsPage)}
              totalPages={totalPages(assetData.revenueClaims)}
            /> */}
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

// Metadata Card Component
const MetadataCard = ({ metadata, tokenOwner }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg hover:shadow-xl hover:border-purple-500/30 transition-all">
    <div className="flex items-center gap-2 mb-6">
      <FileText className="text-purple-400" size={24} />
      <h3 className="text-xl font-bold text-slate-200">Asset Metadata</h3>
    </div>
    <div className="space-y-4">
      <InfoRow label="Asset ID" value={metadata.id.slice(0,5)} icon={<Hash size={16} />} />
      <InfoRow label="Name" value={metadata.name} />
      <InfoRow label="Uri" value={metadata.uri} />
      <InfoRow label="Creator" value={tokenOwner} mono />
      <InfoRow label="Registered" value={metadata.registrationDate} icon={<Calendar size={16} />} />
      <InfoRow label="IP Id" value={metadata.ipId.slice(0,5)} />
      <InfoRow label="Chain Id" value={metadata.chainId} mono />
      <InfoRow label="Token Contract" value={metadata.tokenContract.slice(0,5)} icon={<TrendingUp size={16} />} highlight />
      <InfoRow label="Token Id" value={metadata.tokenId} icon={<TrendingUp size={16} />} highlight />
    </div>
  </div>
);

// License Card Component
const LicenseCard = ({ license }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg hover:shadow-xl hover:border-purple-500/30 transition-all">
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

// Info Row Component
const InfoRow = ({ label, value, icon, mono, highlight, fullWidth, badge, badgeColor }) => (
  <div className={`flex ${fullWidth ? 'flex-col' : 'justify-between items-start'} gap-2`}>
    <span className="text-slate-400 text-sm font-medium flex items-center gap-1">
      {icon}
      {label}:
    </span>
    {badge ? (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        badgeColor === 'green' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
      }`}>
        {value}
      </span>
    ) : (
      <span className={`text-slate-200 ${mono ? 'font-mono text-xs' : ''} ${highlight ? 'text-purple-400 font-bold' : ''} ${fullWidth ? 'mt-1' : 'text-right'}`}>
        {value}
      </span>
    )}
  </div>
);

// Tips Table Component
const TipsTable = ({ tips, currentPage, setCurrentPage, paginatedTips, totalPages }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg">
    <div className="flex items-center gap-2 mb-6">
      <DollarSign className="text-purple-400" size={24} />
      <h3 className="text-xl font-bold text-slate-200">Tips Received</h3>
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
                Tipper
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
            <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
              <div className="flex items-center gap-1">
                <Hash size={14} />
                Transaction
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTips.map((tip) => (
            <tr key={tip.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
              <td className="py-4 px-2">
                <div>
                  <div className="text-slate-200 font-medium">{tip.tipperName}</div>
                  <div className="text-slate-500 text-xs font-mono">{tip.tipper.slice(0, 10)}...{tip.tipper.slice(-8)}</div>
                </div>
              </td>
              <td className="py-4 px-2">
                <span className="text-purple-400 font-bold">{tip.amount}</span>
              </td>
              <td className="py-4 px-2 text-slate-300">{tip.date}</td>
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

  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-700/50">
      <span className="text-slate-400 text-sm">
        Showing {startItem}-{endItem} of {totalItems}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === page
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onchain_IP_History;