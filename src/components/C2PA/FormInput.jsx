import React from 'react';

const FormInput = ({ icon, label, value, onChange, placeholder }) => {
  const Icon = icon;
  
  return (
    <div className="bg-slate-900/30 rounded-lg p-4 border border-purple-700/30">
      <label className="text-purple-200 font-semibold mb-2 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-slate-800/50 border border-purple-700/50 rounded-lg px-4 py-3 text-purple-100 placeholder-purple-400/50 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
      />
    </div>
  );
};

export default FormInput;
