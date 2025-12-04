import { Scale, Search, AlertTriangle, CheckCircle, XCircle, Gavel, FileText, Clock, Shield, TrendingUp, X, File, FlagTriangleRight } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/header';
import toast, { Toaster } from 'react-hot-toast';
import { SkeletonCard, SkeletonLine } from '../components/SkeletonLoader';
import { BrowserProvider, ethers, parseEther } from "ethers";
import { disputeABI } from '../abi/dispute_abi';
import { createStoryClientWithWallet, DisputeContract, formatDate, isDisputed, RPC_URL, secondsFromNow, uploadFileToIPFS, uploadTextToIPFS } from '../utils';
import { ConnectKitButton, ConnectKitProvider } from 'connectkit';
import { http, useConnection } from 'wagmi';
import { DisputeTargetTag, StoryClient } from '@story-protocol/core-sdk'
import { storyAeneid } from 'viem/chains';
import { fetchDisputeDetails } from '../queries';
import { RaiseDisputeModal } from '../components/RaiseDisputeModal';
import { ResolveDisputeModal } from '../components/ResolveDisputeModal';
import { AssertDisputeModal } from '../components/AssertDisputeModal';
import { CancelDisputeModal } from '../components/CancelDisputeModal';
import { SetJudgementModal } from '../components/SetJudgementModal';


const Dispute_Management = () => {
  const [disputeId, setDisputeId] = useState(null);
  const [targetIp, setTargetIp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disputeData, setDisputeData] = useState(null);
  const [totalDisputes, setTotalDisputes] = useState(0); 
  
  // Modal states
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [showJudgementModal, setShowJudgementModal] = useState(false);
  const [showAssertModal, setShowAssertModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const evidenceInputRef = useRef(null);
  const counterDisputeInputRef = useRef(null);

  const { address } = useConnection()

  // Resolve Modal Form
  const [resolveForm, setResolveForm] = useState({ disputeId: '', data: '' });
  
  // Raise Modal Form
  const [raiseForm, setRaiseForm] = useState({
    targetIpId: '',
    disputeEvidenceHash: '',
    targetTag: 'IMPROPER_REGISTRATION',
    bond: 0,
    selectedEvidenceType: 'text',
    evidenceText: '',
    evidenceFile: '',
    liveness: ''
  });

  //argue dispute
  const [assertForm, setAssertForm] = useState({
    targetIpId: '',
    disputeEvidenceHash: '',
    selectedEvidenceType: 'text',
    evidenceText: '',
    evidenceFile: '',
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
    { value: DisputeTargetTag.IMPROPER_REGISTRATION, label: 'Improper Registration' },
    { value: DisputeTargetTag.CONTENT_STANDARDS_VIOLATION, label: 'Content Standards Violation' },
    { value: DisputeTargetTag.IMPROPER_USAGE, label: 'Improper Usage' },
    { value: DisputeTargetTag.IMPROPER_PAYMENT, label: 'Improper Payment' },
    { value: DisputeTargetTag.IN_DISPUTE, label: 'In Dispute' }
  ];


  const fetchDisputesCount = async() => {
  let provider = new ethers.JsonRpcProvider(RPC_URL)
   const contract = new ethers.Contract(DisputeContract, disputeABI, provider)

   contract.disputeCounter().then((res) => 
   setTotalDisputes(Number(res)));
  }

  // fetch dispute data
  const handleFetchDispute = async () => {
    if (!disputeId.trim()) {
      toast.error('Please enter a Dispute ID');
      return;
    }

    setIsLoading(true);
    setDisputeData(null);
    const details = await fetchDisputeDetails(disputeId)

      setTimeout(() => {
       if (details === undefined) {
         toast.error("No Dispute found with this ID");
         setIsLoading(false);
         return;
       }
       setDisputeData(details);
       setIsLoading(false);
       toast.success('Dispute data loaded successfully!');
      }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchDispute();
    }
  };

  // Handle modal submissions
  const handleResolveDispute = async() => {
    try {
    setIsSubmitting(true);
    const { storyClient } = await createStoryClientWithWallet()
    await storyClient.dispute.resolveDispute({
      disputeId: resolveForm.disputeId,
      data: "0x" + Buffer.from(resolveForm.data).toString("hex"),
    })
    toast.success('Dispute resolved successfully!');
    setShowResolveModal(false);
    setIsSubmitting(false);
    setResolveForm({ disputeId: '', data: '' });
    } catch (error) {
      const msg = error?.message || "";
      const extracted = msg.split("\n").find(line => line.startsWith("Error:"));
      console.error(extracted || "Unknown error");
      toast.error(extracted || "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRaiseDispute = async () => {
    try {
    if (!raiseForm.targetIpId || !raiseForm.selectedEvidenceType || !raiseForm.liveness || !raiseForm.targetTag) {
      toast.error('Please fill all fields');
      return;
    }
    setIsSubmitting(true);
    const { storyClient } = await createStoryClientWithWallet()

    const disputeHash = raiseForm.selectedEvidenceType === "file" ? await uploadFileToIPFS(raiseForm.evidenceFile) : await uploadTextToIPFS(raiseForm.evidenceText)

    // Raise a Dispute (8762)
    const disputeResponse = await storyClient.dispute.raiseDispute({
        targetIpId: raiseForm.targetIpId,
        cid: disputeHash,
        targetTag: raiseForm.targetTag,
        bond: parseEther(!raiseForm.bond ? "0" : raiseForm.bond),
        liveness: secondsFromNow(raiseForm.liveness),
    })
    console.log(`Dispute raised at transaction hash ${disputeResponse.txHash}, Dispute ID: ${disputeResponse.disputeId}`)
    setShowRaiseModal(false);
    setIsSubmitting(false);
    setRaiseForm({ targetIpId: '', disputeEvidenceHash: '', targetTag: 'IMPROPER_REGISTRATION', data: '' });
    setTotalDisputes(prev => prev + 1);
    toast.success(`Dispute raised successfully with dispute ID: ${disputeResponse.disputeId}`);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetJudgement = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }
    if (!judgementForm.disputeId || !judgementForm.data) {
      toast.error('Please fill all fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      let provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(DisputeContract, disputeABI, signer)

      const tx = await contract.setDisputeJudgement(Number(judgementForm.disputeId), judgementForm.decision, "0x" + Buffer.from(judgementForm.data).toString("hex"))
      await tx.wait()
      toast.success(`Judgement set: ${judgementForm.decision ? 'Approved' : 'Rejected'}`);
      setShowJudgementModal(false);
      setJudgementForm({ disputeId: '', decision: true, data: '' });
    } catch (error) {
      const msg = error?.message || "";
      const extracted = msg.split("\n").find(line => line.startsWith("Error:"));
      console.error(extracted || "Unknown error");
      toast.error(extracted || "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleAssertDispute = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }
    if ((assertForm.selectedEvidenceType === "file" && !assertForm.evidenceFile) || (!assertForm.selectedEvidenceType === "text" && !assertForm.evidenceText)) {
      toast.error('Please upload or enter evidence');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const { storyClient } = await createStoryClientWithWallet()
    const counterEvidenceCID = assertForm.selectedEvidenceType === "file" ? await uploadFileToIPFS(assertForm.evidenceFile) : await uploadTextToIPFS(assertForm.evidenceText)
    
    const assertionId = await storyClient.dispute.disputeIdToAssertionId(Number(disputeData.id));
    console.log(disputeData);
      const assertDispute = await storyClient.dispute.disputeIdToAssertionId({
        ipId: disputeData.targetIpId,
        assertionId: assertionId,
        counterEvidenceCID: counterEvidenceCID,
    });

      toast.success(`Dispute asserted successfully!`);
      setShowAssertModal(false);
      setAssertForm({ targetIpId: '', disputeId: '', selectedEvidenceType: 'text', evidenceText: '', evidenceFile: '' });
    } catch (error) {
      console.log(error);
      
      const msg = error?.message || "";
      const extracted = msg.split("\n").find(line => line.startsWith("Error:"));
      console.error(extracted || "Unknown error");
      toast.error(extracted || "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelDispute = async() => {
    try {
      setIsSubmitting(true);
    const { storyClient } = await createStoryClientWithWallet()
    await storyClient.dispute.cancelDispute({
      disputeId: cancelForm.disputeId,
      data: "0x" + Buffer.from(cancelForm.data).toString("hex"),
    })
    toast.success('Dispute cancelled successfully!');
    setShowCancelModal(false);
    setIsSubmitting(false);
    setCancelForm({ disputeId: '', data: '' });
    } catch (error) {
      const msg = error?.message || "";
      const extracted = msg.split("\n").find(line => line.startsWith("Error:"));
      console.error(extracted || "Unknown error");
      toast.error(extracted || "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    fetchDisputesCount();
  }, [])
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRaiseForm({...raiseForm, evidenceFile:file});
    }
    if (file && showAssertModal) {
      setAssertForm({...assertForm, evidenceFile:file});
    }
  };

  return (
    <ConnectKitProvider theme='midnight'>
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
            <div>
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

                <div className='flex gap-2'>
                  <button
                    onClick={() => {address === undefined ? toast.error("Please connect your wallet") : setShowRaiseModal(true)}}
                    className="cursor-pointer bg-linear-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-2.5 px-5 rounded-lg font-semibold transition-all shadow-lg hover:shadow-yellow-500/30 flex items-center gap-2 whitespace-nowrap"
                  >
                    <AlertTriangle size={18} />
                    Raise Dispute
                  </button>
                  <ConnectKitButton/>
                </div>
                
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
                  disabled={isLoading || !disputeId}
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
                address={address}
                onResolve={() => {
                  if (address === undefined) {
                    toast.error("Please connect your wallet");
                    return;
                  }
                  setResolveForm({ ...resolveForm, disputeId: disputeId });
                  setShowResolveModal(true);
                }}
                onSetJudgement={() => {
                  if (address === undefined) {
                    toast.error("Please connect your wallet");
                    return;
                  }
                  setJudgementForm({ ...judgementForm, disputeId: disputeId });
                  setShowJudgementModal(true);
                }}
                onCounterDispute={() => {
                  if (address === undefined) {
                    toast.error("Please connect your wallet");
                    return;
                  }
                  setAssertForm({ ...assertForm, targetIpId: disputeData.targetIpId, disputeId: disputeId });
                  setShowAssertModal(true);
                }}
                onCancel={() => {
                  if (address === undefined) {
                    toast.error("Please connect your wallet");
                    return;
                  }
                  if (disputeData.initiator.toLowerCase() !== address.toLowerCase()) {
                    toast.error("Not Dispute Initiator");
                    return;
                  }
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
          isSubmitting={isSubmitting}
          onSubmit={handleResolveDispute}
        />

        <RaiseDisputeModal 
          show={showRaiseModal}
          isSubmitting={isSubmitting}
          onClose={() => setShowRaiseModal(false)}
          form={raiseForm}
          setForm={setRaiseForm}
          onSubmit={handleRaiseDispute}
          targetTagOptions={targetTagOptions}
          evidenceInputRef={evidenceInputRef}
          handleFileUpload={handleFileUpload}
          
          />

        <AssertDisputeModal
          show={showAssertModal}
          isSubmitting={isSubmitting}
          onClose={() => setShowAssertModal(false)}
          form={assertForm}
          setForm={setAssertForm}
          onSubmit={handleAssertDispute}
          evidenceInputRef={counterDisputeInputRef}
          handleFileUpload={handleFileUpload}
        />

        <SetJudgementModal
          show={showJudgementModal}
          onClose={() => setShowJudgementModal(false)}
          form={judgementForm}
          setForm={setJudgementForm}
          isSubmitting={isSubmitting}
          onSubmit={handleSetJudgement}
        />

        <CancelDisputeModal
          show={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          form={cancelForm}
          setForm={setCancelForm}
          isSubmitting={isSubmitting}
          onSubmit={handleCancelDispute}
          
        />
      </div>
    </ConnectKitProvider>
  );
};

// Dispute Card Component
const DisputeCard = ({ disputeData, address, onResolve, onSetJudgement, onCounterDispute, onCancel }) => {
  // const isPending = disputeData.status === 'Pending Judgement';
  
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
            showFullState={true}
            value={disputeData.targetIpId} 
            fullValue={disputeData.targetIpId}
            icon={<Shield size={16} />}
          />
          <InfoRow 
            label="Dispute Initiator" 
            showFullState={true}
            value={disputeData.initiator}
            fullValue={disputeData.initiator}
            icon={<AlertTriangle size={16} />}
          />
          <InfoRow 
            label="Dispute Timestamp" 
            showFullState={true}
            value={formatDate(disputeData.disputeTimestamp)}
            icon={<Clock size={16} />}
          />
          <InfoRow 
            label="Arbitration Policy" 
            showFullState={true}
            value={disputeData.arbitrationPolicy}
            fullValue={disputeData.arbitrationPolicy}
            icon={<Gavel size={16} />}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <InfoRow 
            label="Evidence Hash" 
            showFullState={true}
            value={disputeData.evidenceHash}
            fullValue={disputeData.evidenceHash}
            icon={<FileText size={16} />}
            mono
          />
          <InfoRow 
            label="Target Tag"
            showFullState={false}
            value={Buffer.from(disputeData.targetTag.replace(/^0x/, ""), "hex").toString("ascii").replace(/\0+$/, "")}
            fullValue={Buffer.from(disputeData.targetTag.replace(/^0x/, ""), "hex").toString("ascii").replace(/\0+$/, "")}
            icon={<FileText size={16} />}
            mono
          />
          <InfoRow 
            label="Current Tag"
            showFullState={false}
            value={Buffer.from(disputeData.currentTag.replace(/^0x/, ""), "hex").toString("ascii").replace(/\0+$/, "")}
            fullValue={Buffer.from(disputeData.currentTag.replace(/^0x/, ""), "hex").toString("ascii").replace(/\0+$/, "")}
            icon={<FileText size={16} />}
            mono
          />
        </div>
      </div>

      {/* Action Buttons - Only show if status is Pending */}
      {disputeData.status === "resolved" && (
        <div className="border-t border-purple-500/20 pt-6">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
            <p className="text-purple-300 text-sm font-medium flex items-center gap-2">
              <TrendingUp size={16} />
              This dispute has been resolved.
            </p>
          </div>
        </div>
      )}
      

      {isDisputed(disputeData.currentTag) === "" && (
        <div className="border-t border-purple-500/20 pt-6">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
            <p className="text-purple-300 text-sm font-medium flex items-center gap-2">
              <TrendingUp size={16} />
              This dispute is pending judgement. You can take action below:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={onCounterDispute}
              className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <FlagTriangleRight size={20} />
              Counter Dispute
            </button>
            
            <button
              onClick={onCancel}
              className="cursor-pointer bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2"
            >
              <XCircle size={20} />
              Cancel Dispute
            </button>
          </div>
        </div>
      )}

      {/* Message for non-pending disputes */}
      {(disputeData.status === "infringing")

       && (
        <div className="border-t border-purple-500/20 pt-6">
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 text-center">
            <p className="text-slate-400 text-sm">
              This dispute status is <span className="font-semibold text-slate-300">infringed</span> and only action is to resolve it.
            </p>
          </div>

          <div className="gap-4 mt-2 w-full">
            <button
              onClick={onResolve}
              className="w-full cursor-pointer bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Resolve Dispute
            </button>
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
    Active: 'bg-green-500/20 text-green-400 border-green-500/30',
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
const InfoRow = ({ label, value, fullValue, icon, mono, showFullState }) => {
  const [showFull, setShowFull] = useState(false);
  const displayValue = fullValue && fullValue.length > 30 && !showFull 
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
        {showFullState && fullValue && fullValue.length > 20 && (
          <button
            onClick={() => setShowFull(!showFull)}
            className="text-purple-400 hover:text-purple-300 text-xs transition-colors"
          >
            {showFull ? 'Show less' : 'Show full'}
          </button>
        )}
      </div>
        {displayValue.length > 0 ?
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
      :
      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
          N/A
        </span>
      </div>
      }
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


export default Dispute_Management;