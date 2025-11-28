import { Scale, Search, AlertTriangle, CheckCircle, XCircle, Gavel, FileText, Clock, Shield, TrendingUp, X } from 'lucide-react';
import React, { useState } from 'react';
import Header from '../components/header';
import toast, { Toaster } from 'react-hot-toast';
import { SkeletonCard, SkeletonLine } from '../components/SkeletonLoader';

const Dispute_Management = () => {
  const [disputeId, setDisputeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [disputeData, setDisputeData] = useState(null);
  const [totalDisputes, setTotalDisputes] = useState(127); // Mock total disputes
  
  // Modal states
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [showJudgementModal, setShowJudgementModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Resolve Modal Form
  const [resolveForm, setResolveForm] = useState({ disputeId: '', data: '' });
  
  // Raise Modal Form
  const [raiseForm, setRaiseForm] = useState({
    targetIpId: '',
    disputeEvidenceHash: '',
    targetTag: 'IMPROPER_REGISTRATION',
    data: ''
  });

  // Judgement Modal Form
  const [judgementForm, setJudgementForm] = useState({
    disputeId: '',
    decision: true,
    data: ''
  });

  // Cancel Modal Form
  const [cancelForm, setCancelForm] = useState({ disputeId: '', data: '' });

  const targetTagOptions = [
    { value: 'IMPROPER_REGISTRATION', label: 'Improper Registration' },
    { value: 'PLAGIARISM', label: 'Plagiarism' },
    { value: 'COPYRIGHT_VIOLATION', label: 'Copyright Violation' },
    { value: 'UNAUTHORIZED_USE', label: 'Unauthorized Use' }
  ];

  // Mock fetch dispute data
  const handleFetchDispute = async () => {
    if (!disputeId.trim()) {
      toast.error('Please enter a Dispute ID');
      return;
    }

    setIsLoading(true);
    setDisputeData(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockData = {
        targetIpId: '0xA85e570C61d806a2Bf1bAdB05945A2cC24e85F78',
        disputeInitiator: '0xeAacc52d4F18aEd2377DA4eD70770F2ba22D56Df',
        disputeTimestamp: 1737604273,
        arbitrationPolicy: '0xfFD98c3877B8789124f02C7E8239A4b0Ef11E936',
        disputeEvidenceHash: '0xb7b94ecbd1f9f8cb209909e5785fb2858c9a8c4b220c017995a75346ad1b5db5',
        targetTag: '0x494d50524f5045525f524547495354524154494f4e0000000000000000000000',
        currentTag: '0x0000000000000000000000000000000000000000000000000000000000000000',
        status: 'Pending'
      };

      setDisputeData(mockData);
      toast.success('Dispute data loaded successfully!');
    } catch {
      toast.error('Failed to fetch dispute data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchDispute();
    }
  };

  // Handle modal submissions
  const handleResolveDispute = () => {
    if (!resolveForm.disputeId || !resolveForm.data) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success('Dispute resolved successfully!');
    setShowResolveModal(false);
    setResolveForm({ disputeId: '', data: '' });
  };

  const handleRaiseDispute = () => {
    if (!raiseForm.targetIpId || !raiseForm.disputeEvidenceHash || !raiseForm.data) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success('Dispute raised successfully!');
    setShowRaiseModal(false);
    setRaiseForm({ targetIpId: '', disputeEvidenceHash: '', targetTag: 'IMPROPER_REGISTRATION', data: '' });
    setTotalDisputes(prev => prev + 1);
  };

  const handleSetJudgement = () => {
    if (!judgementForm.disputeId || !judgementForm.data) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success(`Judgement set: ${judgementForm.decision ? 'Approved' : 'Rejected'}`);
    setShowJudgementModal(false);
    setJudgementForm({ disputeId: '', decision: true, data: '' });
  };

  const handleCancelDispute = () => {
    if (!cancelForm.disputeId || !cancelForm.data) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success('Dispute cancelled successfully!');
    setShowCancelModal(false);
    setCancelForm({ disputeId: '', data: '' });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section with Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <Scale className="text-purple-400" size={48} />
              <h1 className="text-4xl font-bold text-slate-200">Dispute Management</h1>
            </div>
            <p className="text-slate-400 text-lg">Manage and resolve IP disputes on the blockchain</p>
          </div>

          {/* Total Disputes Counter */}
          <div className="bg-linear-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 shadow-lg hover:shadow-purple-500/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <FileText className="text-purple-400" size={28} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Disputes</p>
                <p className="text-3xl font-bold text-purple-300">{totalDisputes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 shadow-lg">
            {/* Header with Label and Raise Button */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <label className="flex items-center gap-2 text-slate-300 font-medium">
                <Search size={20} className="text-purple-400" />
                Search Dispute by ID
              </label>
              
              <button
                onClick={() => setShowRaiseModal(true)}
                className="bg-linear-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-2.5 px-5 rounded-lg font-semibold transition-all shadow-lg hover:shadow-yellow-500/30 flex items-center gap-2 whitespace-nowrap"
              >
                <AlertTriangle size={18} />
                Raise Dispute
              </button>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={disputeId}
                onChange={(e) => setDisputeId(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="e.g., 123 or 0x..."
                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <button
                onClick={handleFetchDispute}
                disabled={isLoading || !disputeId.trim()}
                className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-purple-500/20 disabled:cursor-not-allowed"
              >
                <Search size={20} />
                {isLoading ? 'Fetching...' : 'Fetch'}
              </button>
            </div>
            <p className="text-slate-500 text-sm mt-3">Enter a dispute ID to view details</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <DisputeLoadingSkeleton />}

        {/* Dispute Data Display */}
        {!isLoading && disputeData && (
          <div className="space-y-6 animate-fadeIn">
            <DisputeCard 
              disputeData={disputeData} 
              formatDate={formatDate}
              onResolve={() => {
                setResolveForm({ ...resolveForm, disputeId: disputeId });
                setShowResolveModal(true);
              }}
              onSetJudgement={() => {
                setJudgementForm({ ...judgementForm, disputeId: disputeId });
                setShowJudgementModal(true);
              }}
              onCancel={() => {
                setCancelForm({ ...cancelForm, disputeId: disputeId });
                setShowCancelModal(true);
              }}
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !disputeData && (
          <div className="text-center py-20">
            <Scale className="mx-auto mb-4 text-purple-400/50" size={64} />
            <h2 className="text-2xl font-bold text-slate-300 mb-2">No Dispute Selected</h2>
            <p className="text-slate-500">Enter a Dispute ID above to view its details</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ResolveDisputeModal 
        show={showResolveModal}
        onClose={() => setShowResolveModal(false)}
        form={resolveForm}
        setForm={setResolveForm}
        onSubmit={handleResolveDispute}
      />

      <RaiseDisputeModal 
        show={showRaiseModal}
        onClose={() => setShowRaiseModal(false)}
        form={raiseForm}
        setForm={setRaiseForm}
        onSubmit={handleRaiseDispute}
        targetTagOptions={targetTagOptions}
      />

      <SetJudgementModal 
        show={showJudgementModal}
        onClose={() => setShowJudgementModal(false)}
        form={judgementForm}
        setForm={setJudgementForm}
        onSubmit={handleSetJudgement}
      />

      <CancelDisputeModal 
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        form={cancelForm}
        setForm={setCancelForm}
        onSubmit={handleCancelDispute}
      />
    </div>
  );
};

// Dispute Card Component
const DisputeCard = ({ disputeData, formatDate, onResolve, onSetJudgement, onCancel }) => {
  const isPending = disputeData.status === 'Pending';
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="text-purple-400" size={28} />
          <h3 className="text-2xl font-bold text-slate-200">Dispute Details</h3>
        </div>
        <StatusBadge status={disputeData.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Column */}
        <div className="space-y-4">
          <InfoRow 
            label="Target IP ID" 
            value={disputeData.targetIpId} 
            fullValue={disputeData.targetIpId}
            icon={<Shield size={16} />}
          />
          <InfoRow 
            label="Dispute Initiator" 
            value={disputeData.disputeInitiator}
            fullValue={disputeData.disputeInitiator}
            icon={<AlertTriangle size={16} />}
          />
          <InfoRow 
            label="Dispute Timestamp" 
            value={formatDate(disputeData.disputeTimestamp)}
            icon={<Clock size={16} />}
          />
          <InfoRow 
            label="Arbitration Policy" 
            value={disputeData.arbitrationPolicy}
            fullValue={disputeData.arbitrationPolicy}
            icon={<Gavel size={16} />}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <InfoRow 
            label="Evidence Hash" 
            value={disputeData.disputeEvidenceHash}
            fullValue={disputeData.disputeEvidenceHash}
            icon={<FileText size={16} />}
            mono
          />
          <InfoRow 
            label="Target Tag" 
            value={disputeData.targetTag}
            fullValue={disputeData.targetTag}
            icon={<FileText size={16} />}
            mono
          />
          <InfoRow 
            label="Current Tag" 
            value={disputeData.currentTag}
            fullValue={disputeData.currentTag}
            icon={<FileText size={16} />}
            mono
          />
        </div>
      </div>

      {/* Action Buttons - Only show if status is Pending */}
      {isPending && (
        <div className="border-t border-purple-500/20 pt-6">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
            <p className="text-purple-300 text-sm font-medium flex items-center gap-2">
              <TrendingUp size={16} />
              This dispute is pending. You can take action below:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={onResolve}
              className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Resolve Dispute
            </button>
            
            <button
              onClick={onSetJudgement}
              className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Gavel size={20} />
              Set Judgement
            </button>
            
            <button
              onClick={onCancel}
              className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2"
            >
              <XCircle size={20} />
              Cancel Dispute
            </button>
          </div>
        </div>
      )}

      {/* Message for non-pending disputes */}
      {!isPending && (
        <div className="border-t border-purple-500/20 pt-6">
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">
              This dispute has been <span className="font-semibold text-slate-300">{disputeData.status.toLowerCase()}</span> and no further actions can be taken.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const colors = {
    Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
    Cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };

  return (
    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${colors[status] || colors.Pending}`}>
      {status}
    </span>
  );
};

// Info Row Component with Copy
const InfoRow = ({ label, value, fullValue, icon, mono }) => {
  const [showFull, setShowFull] = useState(false);
  const displayValue = fullValue && fullValue.length > 20 && !showFull 
    ? `${fullValue.slice(0, 6)}...${fullValue.slice(-4)}`
    : value;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullValue || value);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="bg-slate-900/30 rounded-lg p-4 hover:bg-slate-900/50 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
          {icon}
          {label}
        </span>
        {fullValue && fullValue.length > 20 && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="text-purple-400 hover:text-purple-300 text-xs transition-colors"
          >
            {showFull ? 'Show less' : 'Show full'}
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span 
          className={`text-slate-200 ${mono ? 'font-mono text-xs' : ''} break-all`}
        >
          {displayValue}
        </span>
        <button
          onClick={handleCopy}
          className="text-purple-400 hover:text-purple-300 transition-colors shrink-0"
          title="Copy to clipboard"
        >
          <FileText size={14} />
        </button>
      </div>
    </div>
  );
};

// Loading Skeleton
const DisputeLoadingSkeleton = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/30">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
        <p className="text-purple-300 text-sm font-medium">Fetching Dispute Data...</p>
      </div>
    </div>

    <SkeletonCard>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 bg-slate-700/50 rounded animate-pulse"></div>
        <SkeletonLine width="w-48" height="h-7" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-slate-900/30 rounded-lg p-4">
              <SkeletonLine width="w-32" height="h-4" />
              <div className="mt-2">
                <SkeletonLine width="w-full" height="h-5" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-900/30 rounded-lg p-4">
              <SkeletonLine width="w-32" height="h-4" />
              <div className="mt-2">
                <SkeletonLine width="w-full" height="h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SkeletonCard>
  </div>
);

// Modal Components
const Modal = ({ show, onClose, title, children, icon: Icon }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-800 rounded-2xl border border-purple-500/30 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-purple-500/20 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && <Icon className="text-purple-400" size={24} />}
            <h2 className="text-2xl font-bold text-slate-200">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const ResolveDisputeModal = ({ show, onClose, form, setForm, onSubmit }) => (
  <Modal show={show} onClose={onClose} title="Resolve Dispute" icon={CheckCircle}>
    <div className="space-y-4">
      <div>
        <label className="block text-slate-300 font-medium mb-2">Dispute ID</label>
        <input
          type="text"
          value={form.disputeId}
          onChange={(e) => setForm({ ...form, disputeId: e.target.value })}
          placeholder="Enter dispute ID"
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
        />
      </div>
      <div>
        <label className="block text-slate-300 font-medium mb-2">Data (bytes)</label>
        <textarea
          value={form.data}
          onChange={(e) => setForm({ ...form, data: e.target.value })}
          placeholder="0x..."
          rows={4}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono text-sm"
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg"
      >
        Confirm Resolution
      </button>
    </div>
  </Modal>
);

const RaiseDisputeModal = ({ show, onClose, form, setForm, onSubmit, targetTagOptions }) => (
  <Modal show={show} onClose={onClose} title="Raise New Dispute" icon={AlertTriangle}>
    <div className="space-y-4">
      <div>
        <label className="block text-slate-300 font-medium mb-2">Target IP ID</label>
        <input
          type="text"
          value={form.targetIpId}
          onChange={(e) => setForm({ ...form, targetIpId: e.target.value })}
          placeholder="0x..."
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono"
        />
      </div>
      <div>
        <label className="block text-slate-300 font-medium mb-2">Evidence Hash</label>
        <input
          type="text"
          value={form.disputeEvidenceHash}
          onChange={(e) => setForm({ ...form, disputeEvidenceHash: e.target.value })}
          placeholder="0x..."
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono"
        />
      </div>
      <div>
        <label className="block text-slate-300 font-medium mb-2">Target Tag</label>
        <select
          value={form.targetTag}
          onChange={(e) => setForm({ ...form, targetTag: e.target.value })}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
        >
          {targetTagOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-slate-300 font-medium mb-2">Data (bytes)</label>
        <textarea
          value={form.data}
          onChange={(e) => setForm({ ...form, data: e.target.value })}
          placeholder="0x..."
          rows={4}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono text-sm"
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-linear-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-3 rounded-lg font-semibold transition-all shadow-lg"
      >
        Raise Dispute
      </button>
    </div>
  </Modal>
);

const SetJudgementModal = ({ show, onClose, form, setForm, onSubmit }) => (
  <Modal show={show} onClose={onClose} title="Set Dispute Judgement" icon={Gavel}>
    <div className="space-y-4">
      <div>
        <label className="block text-slate-300 font-medium mb-2">Dispute ID</label>
        <input
          type="text"
          value={form.disputeId}
          onChange={(e) => setForm({ ...form, disputeId: e.target.value })}
          placeholder="Enter dispute ID"
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
        />
      </div>
      <div>
        <label className="block text-slate-300 font-medium mb-2">Decision</label>
        <div className="flex gap-4">
          <button
            onClick={() => setForm({ ...form, decision: true })}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              form.decision
                ? 'bg-green-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CheckCircle className="inline-block mr-2" size={18} />
            Approve
          </button>
          <button
            onClick={() => setForm({ ...form, decision: false })}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              !form.decision
                ? 'bg-red-600 text-white'
                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <XCircle className="inline-block mr-2" size={18} />
            Reject
          </button>
        </div>
      </div>
      <div>
        <label className="block text-slate-300 font-medium mb-2">Data (bytes)</label>
        <textarea
          value={form.data}
          onChange={(e) => setForm({ ...form, data: e.target.value })}
          placeholder="0x..."
          rows={4}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono text-sm"
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg"
      >
        Set Judgement
      </button>
    </div>
  </Modal>
);

const CancelDisputeModal = ({ show, onClose, form, setForm, onSubmit }) => (
  <Modal show={show} onClose={onClose} title="Cancel Dispute" icon={XCircle}>
    <div className="space-y-4">
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <p className="text-red-300 text-sm">
          ⚠️ Warning: Cancelling a dispute is irreversible. Make sure you want to proceed.
        </p>
      </div>
      <div>
        <label className="block text-slate-300 font-medium mb-2">Dispute ID</label>
        <input
          type="text"
          value={form.disputeId}
          onChange={(e) => setForm({ ...form, disputeId: e.target.value })}
          placeholder="Enter dispute ID"
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
        />
      </div>
      <div>
        <label className="block text-slate-300 font-medium mb-2">Data (bytes)</label>
        <textarea
          value={form.data}
          onChange={(e) => setForm({ ...form, data: e.target.value })}
          placeholder="0x..."
          rows={4}
          className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono text-sm"
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-semibold transition-all shadow-lg"
      >
        Cancel Dispute
      </button>
    </div>
  </Modal>
);

export default Dispute_Management;