import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { File } from "lucide-react";


export const RaiseDisputeModal = ({ show, onClose, form, setForm, isSubmitting, onSubmit, targetTagOptions, evidenceInputRef, handleFileUpload }) => (
    <Modal show={show} onClose={onClose} title="Raise New Dispute" icon={AlertTriangle}>
      <div className="space-y-4">
        <div>
          <label className="block text-slate-300 font-medium">Target IP ID</label>
          <span className='text-red-500 text-xs'>The IP ID that is the target of the dispute</span>
          <input
            type="text"
            value={form.targetIpId}
            onChange={(e) => setForm({ ...form, targetIpId: e.target.value })}
            placeholder="0x..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono"
          />
        </div>
        <div>
          <label className="block text-slate-300 font-medium">Tag</label>
          <span className='text-red-500 text-xs'>The target tag of the dispute</span>
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
          <label className="block text-slate-300 font-medium ">Bond (Optional)</label>
          <span className='text-red-500 text-xs'>The amount of wrapper IP that the dispute initiator pays upfront into a pool. To counter that dispute the opposite party of the dispute has to place a bond of the same amount. The winner of the dispute gets the original bond back + 50% of the other party bond. The remaining 50% of the loser party bond goes to the reviewer.</span>
          <input
            type="text"
            value={form.bond}
            onChange={(e) => setForm({ ...form, bond: e.target.value })}
            placeholder="Amount of IP Token to bond your dispute"
            className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono"
          />
        </div>
  
        <div>
          <label className="block text-slate-300 font-medium">Evidence Type</label>
          <span className='text-red-500 text-xs'>Select type for uploading your dispute evidence (documents, images, etc.)</span>
          <select
            value={form.selectedEvidenceType}
            defaultValue="text"
            onChange={(e) => setForm({ ...form, selectedEvidenceType: e.target.value })}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          >
              <option  value="select" disabled>
                --Please select type--
              </option>
              <option value="file">
                File (Image, Audio, Document, Video)
              </option>
              <option value="text">
                Text (Written Text)
              </option>
          </select>
        </div>
  
        {form.selectedEvidenceType === "file"  &&
        <div>
            <input
            ref={evidenceInputRef}
            type="file"
            accept="*"
            onChange={handleFileUpload}
            className="hidden"
            />
          <div
            onClick={() => evidenceInputRef.current?.click()}
            className="border-2 border-dashed border-purple-700/50 rounded-xl p-16 mb-6 text-center hover:border-purple-600/70 transition-colors cursor-pointer"
            >
            {form.evidenceFile ? (
              <div className="space-y-4">
                <File className="w-12 h-12 text-green-400 mx-auto" />
                <p className="text-purple-200 text-lg">{form.evidenceFile.name.slice(0,5)+ (" ")+ form.evidenceFile.name.slice(80,form.evidenceFile.name.length-1)}</p>
                <p className="text-purple-400 text-sm">Click to change file</p>
              </div>
            ) : (
              <>
                <File className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-200 text-lg mb-2">Click to upload evidence file</p>
                <p className="text-purple-400 text-sm">documents, images, videos, etc.</p>
              </>
            )}
          </div>
        </div>
        }
        {form.selectedEvidenceType === "text"  &&
        <div>
          <label className="block text-slate-300 font-medium">Text Evidence</label>
          <textarea
            type="text"
            value={form.evidenceText}
            onChange={(e) => setForm({ ...form, evidenceText: e.target.value })}
            placeholder="Fill out your evidence here."
            className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono"
          />
        </div>
        }
  
        <div>
          <label className="block text-slate-300 font-medium ">Liveness</label>
          <span className='text-red-500 text-xs'>The liveness is the time window (in seconds) in which a counter dispute can be presented.</span>
          <input
            type="datetime-local"
            value={form.liveness}
            onChange={(e) => setForm({ ...form, liveness: e.target.value })}
            placeholder=""
            className="w-full mt-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono"
          />
        </div>
  
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          {isSubmitting ? 'Processing...' : 'Raise Dispute'}
        </button>
      </div>
    </Modal>
  );