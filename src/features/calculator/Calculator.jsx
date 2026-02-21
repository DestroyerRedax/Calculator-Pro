import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, History as HistIcon, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';

export default function Calculator() {
  const [exp, setExp] = useState('');
  const [res, setRes] = useState('');
  const [showHist, setShowHist] = useState(false);
  const { history, addHistory, clearHistory, isScientific, toggleScientific } = useStore();

  useEffect(() => {
    try {
      if (exp) {
        let clean = exp.replace(/×/g, '*').replace(/÷/g, '/').replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/log/g, 'Math.log10').replace(/√/g, 'Math.sqrt').replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E').replace(/\^/g, '**');
        setRes(String(eval(clean)));
      } else setRes('');
    } catch { setRes(''); }
  }, [exp]);

  const handle = (v) => {
    if (v === '=') { if (res && res !== 'Error') { addHistory(`${exp} = ${res}`); setExp(res); setRes(''); } }
    else if (v === 'C') { setExp(''); setRes(''); }
    else if (v === '⌫') { setExp(exp.slice(0, -1)); }
    else { setExp(exp + v); }
  };

  const btns = [
    { l: 'C', t: 'f' }, { l: '⌫', t: 'f' }, { l: '%', t: 'f' }, { l: '÷', t: 'o' },
    { l: '7', t: 'n' }, { l: '8', t: 'n' }, { l: '9', t: 'n' }, { l: '×', t: 'o' },
    { l: '4', t: 'n' }, { l: '5', t: 'n' }, { l: '6', t: 'n' }, { l: '-', t: 'o' },
    { l: '1', t: 'n' }, { l: '2', t: 'n' }, { l: '3', t: 'n' }, { l: '+', t: 'o' },
    { l: '0', t: 'n', s: 2 }, { l: '.', t: 'n' }, { l: '=', t: 'o' }
  ];

  const sci = ['sin(', 'cos(', 'tan(', 'log(', '√(', '^', 'π', 'e', '(', ')'];

  return (
    <div className="h-full flex flex-col p-6 bg-black text-white relative">
      <div className="flex-1 flex flex-col justify-end text-right px-2 mb-4 pt-16">
        <div className="text-xl opacity-30 h-6 mb-1">{history[0]?.split('=')[0] || ""}</div>
        <div className="text-7xl font-light break-all leading-tight mb-2">{exp || "0"}</div>
        <div className="text-4xl text-dark-accent font-bold opacity-80 h-10">{res ? `= ${res}` : ""}</div>
      </div>

      <div className="flex justify-start gap-4 mb-4 opacity-60">
        <button onClick={toggleScientific} className={`p-2 rounded-lg ${isScientific ? 'bg-dark-accent text-white' : 'bg-dark-surface'}`}><Settings size={18} /></button>
        <button onClick={() => setShowHist(true)} className="p-2 bg-dark-surface rounded-lg"><HistIcon size={18} /></button>
      </div>

      <div className="flex flex-col gap-3 pb-6">
        <AnimatePresence>
          {isScientific && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0 }} className="grid grid-cols-5 gap-2 overflow-hidden mb-2">
              {sci.map(b => <button key={b} onClick={() => handle(b)} className="bg-white/5 py-3 rounded-xl text-xs font-bold text-dark-muted">{b}</button>)}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-4 gap-4">
          {btns.map((b, i) => <motion.button key={i} whileTap={{ backgroundColor: '#fff', scale: 0.95 }} onClick={() => handle(b.l)}
              className={`flex items-center justify-center text-3xl font-medium ${b.s === 2 ? 'col-span-2 rounded-[50px] px-8 justify-start' : 'aspect-square rounded-full'} ${b.t === 'n' ? 'bg-dark-button' : b.t === 'o' ? 'bg-dark-accent' : 'bg-dark-muted text-black'}`}
            >{b.l}</motion.button>)}
        </div>
      </div>

      <AnimatePresence>
        {showHist && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-0 z-50 bg-black p-8 pt-20 flex flex-col">
            <div className="flex justify-between items-center mb-10"><h3 className="text-2xl font-bold">History</h3><div className="flex gap-6 items-center"><Trash2 onClick={clearHistory} className="text-red-500" /><button onClick={() => setShowHist(false)} className="text-dark-accent font-bold">Done</button></div></div>
            <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">{history.map((h, i) => <div key={i} className="text-right border-b border-white/5 pb-4"><div className="opacity-40">{h.split('=')[0]}</div><div className="text-2xl font-bold text-dark-accent">{h.split('=')[1]}</div></div>)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
