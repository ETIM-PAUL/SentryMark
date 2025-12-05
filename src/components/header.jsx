import React, { useState } from 'react';
import { Upload, Eye, Scale, Music, Globe, Link } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';

const Header = () => {
  const [activeTab, setActiveTab] = useState('watermarking');
  const navigate = useNavigate();

  const tabs = [
    { href:'/', id: 'watermarking', label: 'AI Watermarking', icon: Upload },
    { href:'/audio-detect', id: 'audio', label: 'IP Asset C2PA', icon: Music },
    { href:'/onchain-ip-history', id: 'blockchain', label: 'Blockchain Provenance', icon: Link },
    { href:'/dispute_management', id: 'dispute', label: 'Dispute Management', icon: Scale },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Tab Navigation */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.id}
                  to={tab.href}
                  className={({ isActive, isPending }) => `flex cursor-pointer items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-purple-300 border-b-2 border-purple-400 bg-purple-900/20'
                      : 'text-slate-400 hover:text-purple-300 hover:bg-purple-900/10'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;