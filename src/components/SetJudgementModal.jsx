import { Gavel } from "lucide-react";
import { Modal } from "./Modal";
import { CheckCircle } from "lucide-react";
import { XCircle } from "lucide-react";


export const SetJudgementModal = ({ show, onClose, form, setForm, isSubmitting, onSubmit }) => (
    <Modal show={show} onClose={onClose} title="Set Dispute Judgement" icon={Gavel}>
      <div className="space-y-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-300 text-sm">
            ⚠️ The setDisputeJudgement can only be called by whitelisted addresses and allows the caller to set the dispute judgment. Can only be called once as dispute decisions are immutable. If 3rd parties want to offer the possibility for recourse they can do so on their end and relay the final judgment.
          </p>
        </div>
        <div>
          <label className="block text-slate-300 font-medium mb-2">Dispute ID</label>
          <input
            type="text"
            value={form.disputeId}
            disabled={true}
            onChange={(e) => setForm({ ...form, disputeId: e.target.value })}
            placeholder="Enter dispute ID"
            className="w-full disabled:cursor-not-allowed bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
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
          <label className="block text-slate-300 font-medium mb-2">Data (optional)</label>
          <textarea
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
            placeholder="Fill out your data here."
            rows={4}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 font-mono text-sm"
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          {isSubmitting ? 'Processing...' : 'Set Judgement'}
        </button>
      </div>
    </Modal>
  );