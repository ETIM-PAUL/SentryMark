import { X } from "lucide-react";

export const Modal = ({ show, onClose, title, children, icon: Icon }) => {
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