import React, { useState, useMemo, useEffect, useRef } from 'react';
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
  const [picker, setPicker] = useState(null); 
  const [search, setSearch] = useState('');
  const [viewHeight, setViewHeight] = useState('100vh'); // কিবোর্ড হাইট ট্র্যাক করার জন্য

  // কিবোর্ড ওপেন হলে হাইট ডাইনামিক্যালি সেট করার লজিক
  useEffect(() => {
    if (!window.visualViewport) return;
    const handleResize = () => {
      setViewHeight(`${window.visualViewport.height}px`);
    };
    window.visualViewport.addEventListener('resize', handleResize);
    return () => window.visualViewport.removeEventListener('resize', handleResize);
  }, []);

  const ratesList = useMemo(() => {
    if (!data || !data.rates) return [];
    return Object.keys(data.rates)
      .filter(code => code.toLowerCase().includes(search.toLowerCase()))
      .sort();
  }, [data, search]);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-dark-accent" /></div>;

  const converted = data?.rates ? (parseFloat(amt || 0) * (data.rates[to] / data.rates[from])).toFixed(2) : "0.00";

  return (
    <div className="h-full flex flex-col p-6 pt-24 bg-black relative">
      <div className="text-center mb-10"><h2 className="text-3xl font-bold">Currency</h2></div>
      
      <div className="space-y-4 max-w-sm mx-auto w-full">
        <div onClick={() => { setPicker('from'); setSearch(''); }} 
          className="bg-dark-surface p-6 rounded-[32px] border border-white/5 active:bg-white/5">
          <label className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{from}</label>
          <div className="text-4xl font-bold text-white">{amt} <span className="text-sm opacity-20 font-normal">Change</span></div>
        </div>

        <div className="bg-dark-surface p-4 rounded-2xl border border-white/5">
           <input type="number" value={amt} onChange={e => setAmt(e.target.value)} 
            placeholder="Amount" className="bg-transparent text-xl font-bold w-full outline-none text-center" />
        </div>

        <div className="flex justify-center -my-8 relative z-10">
          <button onClick={() => { setFrom(to); setTo(from); }} 
            className="bg-dark-accent p-4 rounded-full text-white shadow-xl active:scale-75"><ArrowUpDown size={24} /></button>
        </div>

        <div onClick={() => { setPicker('to'); setSearch(''); }} 
          className="bg-dark-surface p-6 rounded-[32px] border border-white/5 active:bg-white/5">
          <label className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{to}</label>
          <div className="text-4xl font-bold truncate">{converted}</div>
        </div>
      </div>

      {/* Full Screen Dynamic Picker */}
      <AnimatePresence>
        {picker && (
          <motion.div 
            style={{ height: viewHeight }} // এখানে ডাইনামিক হাইট ব্যবহার করা হয়েছে
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-[100] bg-black flex flex-col"
          >
            {/* Search Input - Sticky to the top */}
            <div className="p-4 pt-10 flex items-center gap-4 bg-dark-surface border-b border-white/5">
              <Search size={20} className="text-dark-accent" />
              <input 
                autoFocus 
                placeholder="Search Currency..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                className="flex-1 bg-transparent py-2 text-xl outline-none text-white" 
              />
              <button onClick={() => setPicker(null)} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
            </div>

            {/* List - This will fit perfectly between Search and Keyboard */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
              {ratesList.map(code => (
                <button key={code} 
                  onClick={() => { if (picker === 'from') setFrom(code); else setTo(code); setPicker(null); }} 
                  className="w-full p-5 text-left flex justify-between items-center border-b border-white/5 active:bg-dark-accent/20">
                  <span className={`text-lg ${ (picker==='from'?from:to) === code ? 'text-dark-accent font-bold' : 'text-white'}`}>{code}</span>
                  {(picker==='from'?from:to) === code && <Check size={20} className="text-dark-accent" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
