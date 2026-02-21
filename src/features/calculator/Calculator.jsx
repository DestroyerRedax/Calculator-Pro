import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Trash2 } from 'lucide-react';
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
        setRes(String(eval(cleanExp)));
      } else setRes('');
    } catch { setRes(''); }
  }, [exp]);

  const handle = (v) => {
    if (v === '=') {
      if (res) {
        addHistory(`${exp} = ${res}`);
        setExp(res); setRes('');
      }
    } else if (v === 'AC') { setExp(''); setRes(''); }
    else if (v === '⌫') setExp(exp.slice(0, -1));
    else setExp(exp + v);
  };

  return (
    <div className="h-full flex flex-col p-4 pt-16 bg-dark-bg">
      <div className="flex justify-between items-center px-2 mb-2">
        <span className="text-dark-accent font-black text-xs tracking-widest uppercase">Smart Calculator</span>
        <button onClick={() => setShowHist(true)} className="p-2 bg-dark-surface rounded-xl active:scale-90 transition-transform">
          <History size={20} className="text-dark-accent" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-end text-right px-4 pb-4">
        <div className="text-xl opacity-40 font-medium h-6">{history[0]?.split('=')[0] || ""}</div>
        <div className="text-5xl font-bold my-2 break-all">{exp || "0"}</div>
        <div className="text-3xl text-dark-accent font-bold opacity-80 h-10">{res ? `= ${res}` : ""}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 h-[60%]">
        {['AC', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '.', '0', '⌫', '='].map((b) => (
          <motion.button
            key={b}
            whileTap={{ scale: 0.9, transition: { duration: 0.05 } }}
            onClick={() => handle(b)}
            className={`flex items-center justify-center rounded-[24px] text-2xl font-bold ${
              ['÷', '×', '-', '+', '='].includes(b) ? 'bg-dark-accent text-white' : 
              ['AC', '(', ')', '⌫'].includes(b) ? 'bg-white/10 text-dark-accent' : 'bg-dark-surface text-white'
            }`}
          >
            {b}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showHist && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.15 }} className="fixed inset-0 z-50 bg-dark-bg p-6 pt-16 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">History</h3>
              <div className="flex gap-4">
                <Trash2 onClick={clearHistory} className="text-red-500" />
                <button onClick={() => setShowHist(false)} className="text-dark-accent font-bold">Close</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar">
              {history.map((h, i) => (
                <div key={i} className="p-4 bg-dark-surface rounded-2xl text-right border-r-4 border-dark-accent">
                  <div className="text-xs opacity-50">{h.split('=')[0]}</div>
                  <div className="text-lg font-bold text-dark-accent">{h.split('=')[1]}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
