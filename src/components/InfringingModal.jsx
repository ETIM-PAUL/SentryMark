import { CrosshairIcon, User } from 'lucide-react';
import { formatDate } from '../utils';

export const InfringingModal = ({ infringeResult }) => {

    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-500/20 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <CrosshairIcon className="text-slate-400" size={24} />
        <h3 className="text-xl font-bold text-slate-200">Infringements</h3>
        <span className="ml-auto bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
          {infringeResult?.length ?? 0} Total
        </span>
      </div>

      {infringeResult?.length > 0 ?
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className='w-full'>
            <tr className="border-b border-slate-700/50">
              <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  Provider
                </div>
              </th>
              <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
                <div className="flex items-center gap-1">
                  Is Infringing
                </div>
              </th>
              <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
                <div className="flex items-center gap-1">
                  Details
                </div>
              </th>
              <th className="text-left text-slate-400 font-medium text-sm py-3 px-2">
                <div className="flex items-center gap-1">
                Created
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {infringeResult.map((infringe) => (
              <tr key={infringe.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                <td className="py-4 px-2">
                  <div>
                    <div className="text-slate-500 text-xs font-mono">{infringe.providerName === "" ? "N/A" : infringe.providerName}</div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-slate-400 font-mono text-xs">{infringe.isInfringing ? "True" : "False"}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-slate-400 font-mono text-xs">{(infringe.infringementDetails === "[]" || infringe.infringementDetails === "") ? "N/A" : infringe.infringementDetails}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-slate-400 font-mono text-xs">{formatDate(infringe.createdAt)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      :
      <span className="ml-auto bg-slate-500/20 text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
      No Infringement found
      </span>
      }
    </div>
    );
  };