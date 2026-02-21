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
    try { if (exp) setRes(String(eval(exp.replace(/×/g, '*').replace(/÷/g, '/')))); else setRes(''); } 
    catch { setRes(''); }
  }, [exp]);

  const handle = (v) => {
    if (v === '=') { if (res) { addHistory(`${exp} = ${res}`); setExp(res); setRes(''); } }
    else if (v === 'AC') { setExp(''); setRes(''); }
    else if (v === '⌫') setExp(exp.slice(0, -1));
    else setExp(exp + v);
  };

  const btns = [
    { l: 'AC', t: 'f' }, { l: '(', t: 'f' }, { l: ')', t: 'f' }, { l: '÷', t: 'o' },
    { l: '7', t: 'n' }, { l: '8', t: 'n' }, { l: '9', t: 'n' }, { l: '×', t: 'o' },
    { l: '4', t: 'n' }, { l: '5', t: 'n' }, { l: '6', t: 'n' }, { l: '-', t: 'o' },
    { l: '1', t: 'n' }, { l: '2', t: 'n' }, { l: '3', t: 'n' }, { l: '+', t: 'o' },
    { l: '0', t: 'n', s: 2 }, { l: '.', t: 'n' }, { l: '=', t: 'o' }
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-black text-white relative">
      <div className="absolute top-4 right-4 z-40">
        <button onClick={() => setShowHist(true)} className="p-3 bg-dark-surface/60 backdrop-blur-md rounded-2xl border border-white/5 active:scale-90 transition-transform">
          <History size={24} className="text-dark-accent" />
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-end text-right px-2 mb-6 pt-24">
        <div className="text-2xl opacity-30 h-8 mb-1">{history[0]?.split('=')[0] || ""}</div>
        <div className="text-7xl font-light tracking-tight break-all mb-2 leading-tight">{exp || "0"}</div>
        <div className="text-3xl text-dark-accent font-medium h-10">{res ? `= ${res}` : ""}</div>
      </div>
      <div className="grid grid-cols-4 gap-4 pb-8">
        {btns.map((b, i) => (
          <motion.button key={i} whileTap={{ backgroundColor: '#fff', scale: 0.95 }} onClick={() => handle(b.l)}
            className={`flex items-center justify-center text-3xl font-medium ${b.s === 2 ? 'col-span-2 rounded-[50px] px-8 justify-start' : 'aspect-square rounded-full'} ${b.t === 'n' ? 'bg-dark-button' : b.t === 'o' ? 'bg-dark-accent' : 'bg-dark-muted text-black'}`}
          >{b.l}</motion.button>
        ))}
      </div>
      <AnimatePresence>
        {showHist && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 bg-black p-8 pt-20 flex flex-col">
            <div className="flex justify-between items-center mb-10"><h3 className="text-3xl font-bold">History</h3><div className="flex gap-6 items-center"><Trash2 onClick={clearHistory} className="text-red-500" /><button onClick={() => setShowHist(false)} className="text-dark-accent text-xl font-bold">Done</button></div></div>
            <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar">{history.map((h, i) => <div key={i} className="text-right border-b border-white/5 pb-4"><div className="opacity-40">{h.split('=')[0]}</div><div className="text-3xl font-bold text-dark-accent">{h.split('=')[1]}</div></div>)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
