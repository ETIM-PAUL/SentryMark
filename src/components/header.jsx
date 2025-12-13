import React, { useState } from 'react';
import { Upload, Eye, Scale, Music, Globe, Link } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';

const Header = () => {
  const [activeTab, setActiveTab] = useState('watermarking');
  const navigate = useNavigate();

  const tabs = [
    { href:'/', id: 'watermarking', label: 'AI Watermarking', icon: Upload },
    { href:'/c2pa-asset', id: 'audio', label: 'IP Asset C2PA', icon: Music },
    { href:'/onchain-ip-tracking', id: 'blockchain', label: 'Blockchain Provenance', icon: Link },
    { href:'/dispute_management', id: 'dispute', label: 'Dispute Management', icon: Scale },
  ];

  return (
      <div className="bg-gray-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <img className='text-red-500 w-16 object-cover' src='/SentryMark.png'/>
          <div className="flex overflow-x-auto justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.id}
                  to={tab.href}
                  className={({ isActive, isPending }) => `flex cursor-pointer items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-white border-b-2 border-white bg-gray-500'
                      : 'text-gray-400 hover:text-white hover:bg-gray-500'
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
  );
};

export default Header;