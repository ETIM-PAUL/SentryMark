import { XCircle } from "lucide-react";
import { Modal } from "./Modal";

export const CancelDisputeModal = ({ show, onClose, form, setForm, isSubmitting, onSubmit }) => (
    <Modal show={show} onClose={onClose} title="Cancel Dispute" icon={XCircle}>
      <div className="space-y-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-300 text-sm">
            ⚠️ Currently, the UMA Arbitration Policy does not support cancelling disputes.
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
          // disabled={true}
          className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          {isSubmitting ? 'Processing...' : 'Cancel Dispute'}
        </button>
      </div>
    </Modal>
  );