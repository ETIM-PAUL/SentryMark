import { Users, GitBranch, Network, Shield, UserCircle } from 'lucide-react';


export const RelationshipStats = ({ parentsCount, ancestorsCount, childrenCount, descendantsCount, isInGroup, creators }) => {
    const stats = [
      { label: 'Parents', value: parentsCount ?? 0, icon: <Users size={20} />, color: 'text-blue-400' },
      { label: 'Ancestors', value: ancestorsCount ?? 0, icon: <GitBranch size={20} />, color: 'text-purple-400' },
      { label: 'Children', value: childrenCount ?? 0, icon: <Network size={20} />, color: 'text-green-400' },
      { label: 'Descendants', value: descendantsCount ?? 0, icon: <GitBranch size={20} className="rotate-180" />, color: 'text-pink-400' },
    ];
  
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

          {/* Creators Section */}
          {creators && creators.length > 0 && (
            <div className="bg-slate-900/30 rounded-lg p-4 hover:bg-slate-900/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <UserCircle className="text-cyan-400" size={20} />
                <span className="text-slate-300 font-medium">Creators</span>
              </div>
              <div className="space-y-3">
                {creators.map((creator, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-cyan-300 font-semibold text-sm">{creator.name}</span>
                    </div>
                    <div className="text-slate-400 text-xs font-mono break-all">
                      {creator.address}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };