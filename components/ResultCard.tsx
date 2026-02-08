
import React from 'react';
import { ReactionResult, SafetyLevel } from '../types';
import { SAFETY_COLORS } from '../constants';

interface Props {
  result: ReactionResult;
}

export const ResultCard: React.FC<Props> = ({ result }) => {
  const color = SAFETY_COLORS[result.type] || 'gray';

  const getIcon = () => {
    switch(result.type) {
      case SafetyLevel.SAFE: 
        return <div className="bg-green-500/90 text-white rounded-2xl p-2 shadow-lg"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>;
      case SafetyLevel.DANGEROUS:
      case SafetyLevel.VERY_DANGEROUS:
        return <div className="bg-red-500/90 text-white rounded-2xl p-2 shadow-lg"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>;
      default:
        return <div className="bg-amber-500/90 text-white rounded-2xl p-2 shadow-lg"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></div>;
    }
  };

  return (
    <div 
      className="w-full glass-card rounded-[3.5rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-12 transition-all duration-1000 border-2"
      style={{ borderColor: `${color}33` }}
    >
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            {getIcon()}
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight" style={{ color }}>
                {result.type}
              </h2>
              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mt-1">
                {result.chemicals[0]} + {result.chemicals[1]}
              </p>
            </div>
          </div>
          <div className="bg-white/40 px-6 py-2 rounded-2xl border border-white/60">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block text-center">Stability</span>
             <span className="text-sm font-bold text-slate-800">{result.type === SafetyLevel.SAFE ? 'High' : 'At Risk'}</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/40">
            <h3 className="text-2xl font-black text-slate-800 mb-3">{result.title}</h3>
            <p className="text-slate-600 leading-relaxed font-semibold text-lg">
              {result.explanation}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/30 backdrop-blur p-6 rounded-[2rem] border border-white/50">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Guidelines</h4>
              <ul className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-bold">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-sky-500/5 backdrop-blur p-6 rounded-[2rem] border border-sky-500/10 flex flex-col justify-center items-center text-center">
               <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest mb-1">Observation</span>
               <span className="text-xl font-black text-slate-800">{result.type === SafetyLevel.SAFE ? 'Cleared' : 'Restricted'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
