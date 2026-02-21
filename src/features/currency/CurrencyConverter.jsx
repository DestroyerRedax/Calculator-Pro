import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ArrowUpDown, Check, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurrencyConverter() {
  const { data, isLoading } = useQuery({ 
    queryKey: ['rates'], 
    queryFn: async () => (await fetch('https://open.er-api.com/v6/latest/USD')).json() 
  });

  const [amt, setAmt] = useState('1'); 
  const [from, setFrom] = useState('USD'); 
  const [to, setTo] = useState('BDT'); 
  const [picker, setPicker] = useState(null); // 'from' | 'to' | null
  const [search, setSearch] = useState('');

  // বিশ্বের সব কারেন্সি লিস্ট
  const ratesList = useMemo(() => {
    if (!data || !data.rates) return [];
    return Object.keys(data.rates)
      .filter(code => code.toLowerCase().includes(search.toLowerCase()))
      .sort();
  }, [data, search]);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-dark-accent" /></div>;

  const converted = data?.rates ? (parseFloat(amt || 0) * (data.rates[to] / data.rates[from])).toFixed(2) : "0.00";

  return (
    <div className="h-full flex flex-col p-6 pt-24 bg-black relative z-10">
      <div className="text-center mb-10"><h2 className="text-3xl font-bold">Currency</h2></div>
      
      <div className="space-y-4 max-w-sm mx-auto w-full relative z-20">
        {/* From Section */}
        <div onClick={() => { setPicker('from'); setSearch(''); }} 
          className="bg-dark-surface p-6 rounded-[32px] border border-white/5 active:bg-white/5 cursor-pointer">
          <label className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{from}</label>
          <div className="text-4xl font-bold text-white">{from === 'USD' ? amt : amt} <span className="text-sm opacity-30 font-normal">Tap to change</span></div>
        </div>

        {/* Amount Input */}
        <div className="bg-dark-surface p-4 rounded-2xl border border-white/5">
           <input type="number" value={amt} onChange={e => setAmt(e.target.value)} 
            placeholder="Enter Amount" className="bg-transparent text-xl font-bold w-full outline-none text-center" />
        </div>

        <div className="flex justify-center -my-8 relative z-30">
          <button onClick={(e) => { e.stopPropagation(); setFrom(to); setTo(from); }} 
            className="bg-dark-accent p-4 rounded-full text-white shadow-xl active:scale-75 transition-transform">
            <ArrowUpDown size={24} />
          </button>
        </div>

        {/* To Section */}
        <div onClick={() => { setPicker('to'); setSearch(''); }} 
          className="bg-dark-surface p-6 rounded-[32px] border border-white/5 active:bg-white/5 cursor-pointer">
          <label className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{to}</label>
          <div className="text-4xl font-bold truncate">{converted}</div>
        </div>
      </div>

      {/* Full Screen Search Picker */}
      <AnimatePresence>
        {picker && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-black flex flex-col">
            
            {/* Sticky Search Bar */}
            <div className="p-4 pt-12 flex items-center gap-4 bg-dark-surface border-b border-white/5">
              <Search size={20} className="text-dark-accent" />
              <input 
                autoFocus 
                placeholder="Search Currency (e.g. BDT)" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                className="flex-1 bg-transparent py-2 text-xl outline-none text-white" 
              />
              <button onClick={() => setPicker(null)} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
              {ratesList.map(code => (
                <button key={code} 
                  onClick={() => { 
                    if (picker === 'from') setFrom(code); else setTo(code); 
                    setPicker(null); 
                  }} 
                  className="w-full p-5 text-left flex justify-between items-center border-b border-white/5 active:bg-dark-accent/20">
                  <span className={`text-lg ${ (picker==='from'?from:to) === code ? 'text-dark-accent font-bold' : 'text-white'}`}>{code}</span>
                  {(picker==='from'?from:to) === code && <Check size={20} className="text-dark-accent" />}
                </button>
              ))}
              {ratesList.length === 0 && <div className="p-10 text-center opacity-30">No Currency Found</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
