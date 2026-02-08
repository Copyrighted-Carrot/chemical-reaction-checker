import React from 'react';
import { COMMON_CHEMICALS } from '../constants';
import { Chemical } from '../types';

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onSelect: (c: Chemical) => void;
  icon?: React.ReactNode;
}

export const ChemicalInput: React.FC<Props> = ({ label, value, onChange, onSelect, icon }) => {
  const query = value.trim().toLowerCase();
  
  // Logic: Filter items that contain the query, but sort so that prefix matches are first
  const filteredSuggestions = query.length > 0 
    ? COMMON_CHEMICALS.filter(c => {
        return c.name.toLowerCase().includes(query) || 
               c.formula.toLowerCase().includes(query) ||
               c.aliases.some(a => a.toLowerCase().includes(query));
      }).sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(query);
        const bStarts = b.name.toLowerCase().startsWith(query);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.name.localeCompare(b.name);
      })
    : [];

  const showDropdown = filteredSuggestions.length > 0 && 
                     !COMMON_CHEMICALS.some(c => c.name.toLowerCase() === query);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 opacity-60 group-focus-within:opacity-100 transition-opacity pointer-events-none">
          {icon || (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Chemical Name..."
          className="glass-input w-full pl-12 pr-4 py-4 rounded-[1.25rem] outline-none text-slate-800 font-semibold placeholder:text-slate-300"
        />
        
        {/* Glass Dropdown Suggestions */}
        {showDropdown && (
          <div className="glass-dropdown absolute z-50 w-full mt-3 rounded-[1.25rem] overflow-hidden hidden group-focus-within:block animate-in fade-in slide-in-from-top-2 duration-200">
            {filteredSuggestions.map(c => (
              <button
                key={c.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(c);
                }}
                className="w-full text-left px-5 py-4 hover:bg-sky-50 transition-colors flex items-center justify-between border-b border-slate-100 last:border-none"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm">{c.name}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {c.formula}
                  </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};