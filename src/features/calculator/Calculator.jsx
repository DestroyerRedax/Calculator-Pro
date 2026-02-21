import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Delete, Delete as Backspace } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Calculator() {
  const [exp, setExp] = useState('');
  const [res, setRes] = useState('');
  const [showHist, setShowHist] = useState(false);
  const { history, addHistory, clearHistory } = useStore();

  useEffect(() => {
    try {
      if (exp) {
        const cleanExp = exp.replace(/×/g, '*').replace(/÷/g, '/');
        const evalRes = eval(cleanExp);
        setRes(String(evalRes));
      } else { setRes(''); }
    } catch { setRes(''); }
  }, [exp]);

  const handle = (v) => {
    if (v === '=') {
      if (res && res !== 'Error') {
        addHistory(`${exp} = ${res}`);
        setExp(res);
        setRes('');
      }
    } else if (v === 'AC') { setExp(''); setRes(''); }
    else if (v === '⌫') { setExp(exp.slice(0, -1)); }
    else { setExp(exp + v); }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-dark-bg text-white">
      {/* Top Header */}
      <div className="flex justify-between items-center mt-12 mb-2 px-2">
         <span className="text-dark-accent font-bold tracking-widest uppercase text-xs">Smart Calc</span>
         <button onClick={() => setShowHist(true)} className="p-2 bg-dark-surface rounded-xl">
           <History size={20} className="text-dark-accent" />
         </button>
      </div>

      {/* Display Area - Responsive */}
      <div className="flex-1 flex flex-col justify-end text-right px-4 pb-6 min-h-[150px]">
        <div className="text-2xl opacity-40 h-8 font-medium">{history[0]?.split('=')[0] || ""}</div>
        <div className="text-5xl font-bold my-2 break-all leading-tight">{exp || "0"}</div>
        <div className="text-3xl text-dark-accent font-bold opacity-70 h-10">
          {res ? `= ${res}` : ""}
        </div>
      </div>

      {/* Buttons Grid - Optimized for all screens */}
      <div className="grid grid-cols-4 gap-3 pb-4 h-[55%]">
        {['AC', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '⌫', '='].map((b) => (
          <motion.button
            key={b}
            whileTap={{ scale: 0.92 }}
            onClick={() => handle(b)}
            className={`flex items-center justify-center rounded-3xl text-2xl font-bold transition-all ${
              ['÷', '×', '-', '+', '='].includes(b) ? 'bg-dark-accent text-white' : 
              ['AC', '(', ')', '⌫'].includes(b) ? 'bg-white/10 text-dark-accent' : 'bg-dark-surface'
            } ${b === '=' ? 'shadow-lg shadow-orange-500/20' : ''}`}
          >
            {b}
          </motion.button>
        ))}
      </div>

      {/* History Drawer */}
      <AnimatePresence>
        {showHist && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.2 }} className="fixed inset-0 z-50 bg-dark-bg p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8 pt-12">
              <h3 className="text-2xl font-bold">History</h3>
              <div className="flex gap-4">
                <button onClick={clearHistory} className="text-red-500"><Delete /></button>
                <button onClick={() => setShowHist(false)} className="text-dark-accent font-bold">Close</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
              {history.map((h, i) => (
                <div key={i} className="p-5 bg-dark-surface rounded-3xl text-right border-r-4 border-dark-accent">
                  <div className="text-sm opacity-50">{h.split('=')[0]}</div>
                  <div className="text-xl font-bold text-dark-accent">{h.split('=')[1]}</div>
                </div>
              ))}
              {history.length === 0 && <p className="text-center opacity-30 mt-20">No history yet</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
