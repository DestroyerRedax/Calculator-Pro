import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates, countryMap } from './currencyService';
import { ArrowUpDown, Check, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurrencyConverter() {
  const { data, isLoading } = useQuery({ queryKey: ['rates'], queryFn: fetchExchangeRates });
  const [amt, setAmt] = useState('1'); 
  const [from, setFrom] = useState('United States of America'); // Country Name as key
  const [to, setTo] = useState('Bangladesh'); 
  const [picker, setPicker] = useState(null);

  // কারেন্সি লিস্ট তৈরি (Country Name(Code) ফরম্যাটে)
  const fullList = useMemo(() => {
    return Object.entries(countryMap).map(([country, code]) => ({
      country,
      code,
      label: `${country}(${code})`
    })).sort((a, b) => a.country.localeCompare(b.country));
  }, []);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-dark-accent" /></div>;

  const fromCode = countryMap[from];
  const toCode = countryMap[to];
  
  // ক্যালকুলেশন বাগ-ফ্রি করার জন্য চেক
  const converted = (data?.rates && fromCode && toCode) 
    ? (parseFloat(amt || 0) * (data.rates[toCode] / data.rates[fromCode])).toFixed(2) 
    : "0.00";

  return (
    <div className="h-full flex flex-col p-6 pt-24 bg-black relative">
      <div className="text-center mb-10"><h2 className="text-3xl font-bold">Currency</h2></div>
      
      <div className="space-y-4 max-w-sm mx-auto w-full">
        {/* From Section */}
        <div onClick={() => setPicker('from')} 
          className="bg-dark-surface p-6 rounded-[32px] border border-white/5 active:bg-white/5 transition-all">
          <label className="text-[10px] font-bold text-dark-accent uppercase mb-2 block tracking-widest">From</label>
          <div className="text-lg font-bold text-white mb-2">{from}({fromCode})</div>
          <input 
            type="number" 
            value={amt} 
            onClick={(e) => e.stopPropagation()} 
            onChange={(e) => setAmt(e.target.value)} 
            className="bg-transparent text-4xl font-bold w-full outline-none text-white border-t border-white/5 pt-2" 
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-8 relative z-10">
          <button onClick={() => { const temp = from; setFrom(to); setTo(temp); }} 
            className="bg-dark-accent p-4 rounded-full text-white shadow-2xl active:scale-75 transition-transform">
            <ArrowUpDown size={24} />
          </button>
        </div>

        {/* To Section */}
        <div onClick={() => setPicker('to')} 
          className="bg-dark-surface p-6 rounded-[32px] border border-white/5 active:bg-white/5 transition-all">
          <label className="text-[10px] font-bold text-dark-accent uppercase mb-2 block tracking-widest">To</label>
          <div className="text-lg font-bold text-white mb-2">{to}({toCode})</div>
          <div className="text-4xl font-bold truncate text-white border-t border-white/5 pt-2">{converted}</div>
        </div>
      </div>

      {/* Scrollable Modal Picker */}
      <AnimatePresence>
        {picker && (
          <div className="fixed inset-0 z-[100] flex items-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setPicker(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              className="relative w-full bg-dark-surface rounded-t-[40px] max-h-[75vh] flex flex-col shadow-2xl border-t border-white/10"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/5">
                <h3 className="text-xl font-bold">Select Country</h3>
                <button onClick={() => setPicker(null)} className="p-2 bg-white/5 rounded-full"><X size={20} className="text-dark-accent" /></button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-2">
                {fullList.map((item) => (
                  <button 
                    key={item.country} 
                    onClick={() => { 
                      if (picker === 'from') setFrom(item.country); else setTo(item.country); 
                      setPicker(null); 
                    }} 
                    className={`w-full p-5 text-left flex justify-between items-center rounded-2xl mb-1 ${
                      (picker === 'from' ? from : to) === item.country ? 'bg-dark-accent text-white font-bold' : 'text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{item.label}</span>
                    {(picker === 'from' ? from : to) === item.country && <Check size={20} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
