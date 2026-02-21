import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates, countryMap } from './currencyService';
import { ArrowUpDown, Check, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurrencyConverter() {
  const { data, isLoading } = useQuery({ queryKey: ['rates'], queryFn: fetchExchangeRates });
  const [amt, setAmt] = useState('1'); 
  const [from, setFrom] = useState('USD'); 
  const [to, setTo] = useState('BDT'); 
  const [picker, setPicker] = useState(null); // 'from' | 'to' | null

  // কারেন্সি লিস্ট তৈরি (Country Name + Code)
  const sortedCurrencies = useMemo(() => {
    if (!data || !data.rates) return [];
    return Object.keys(data.rates)
      .map(code => ({
        code,
        fullName: countryMap[code] || `${code} (Global)`
      }))
      .sort((a, b) => a.fullName.localeCompare(b.fullName));
  }, [data]);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-dark-accent" /></div>;

  const converted = data?.rates ? (parseFloat(amt || 0) * (data.rates[to] / data.rates[from])).toFixed(2) : "0.00";

  return (
    <div className="h-full flex flex-col p-6 pt-24 bg-black relative">
      <div className="text-center mb-10"><h2 className="text-3xl font-bold">Currency</h2></div>
      
      <div className="space-y-4 max-w-sm mx-auto w-full">
        {/* From Section */}
        <div onClick={() => setPicker('from')} 
          className="bg-dark-surface p-6 rounded-[32px] border border-white/5 active:bg-white/5 cursor-pointer transition-colors">
          <label className="text-[10px] font-bold text-dark-accent uppercase mb-2 block tracking-widest">From</label>
          <div className="text-xl font-bold text-white mb-2">{countryMap[from] || from}</div>
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
          <button onClick={() => { setFrom(to); setTo(from); }} 
            className="bg-dark-accent p-4 rounded-full text-white shadow-2xl active:scale-75 transition-transform">
            <ArrowUpDown size={24} />
          </button>
        </div>

        {/* To Section */}
        <div onClick={() => setPicker('to')} 
          className="bg-dark-surface p-6 rounded-[32px] border border-white/5 active:bg-white/5 cursor-pointer transition-colors">
          <label className="text-[10px] font-bold text-dark-accent uppercase mb-2 block tracking-widest">To</label>
          <div className="text-xl font-bold text-white mb-2">{countryMap[to] || to}</div>
          <div className="text-4xl font-bold truncate text-white border-t border-white/5 pt-2">{converted}</div>
        </div>
      </div>

      {/* Scrollable Dropdown Picker Modal */}
      <AnimatePresence>
        {picker && (
          <div className="fixed inset-0 z-[100] flex items-end">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setPicker(null)} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            
            {/* Picker Content */}
            <motion.div 
              initial={{ y: '100%' }} 
              animate={{ y: 0 }} 
              exit={{ y: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full bg-dark-surface rounded-t-[40px] max-h-[70vh] flex flex-col shadow-2xl border-t border-white/10"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/5">
                <h3 className="text-xl font-bold text-white">Select Country</h3>
                <button onClick={() => setPicker(null)} className="p-2 bg-white/5 rounded-full">
                  <X size={20} className="text-dark-accent" />
                </button>
              </div>

              {/* Scrollable List Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-2">
                {sortedCurrencies.map((item) => (
                  <button 
                    key={item.code} 
                    onClick={() => { 
                      if (picker === 'from') setFrom(item.code); else setTo(item.code); 
                      setPicker(null); 
                    }} 
                    className={`w-full p-5 text-left flex justify-between items-center rounded-2xl mb-1 transition-colors ${
                      (picker === 'from' ? from : to) === item.code 
                      ? 'bg-dark-accent text-white font-bold' 
                      : 'text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{item.fullName}</span>
                    {(picker === 'from' ? from : to) === item.code && <Check size={20} />}
                  </button>
                ))}
              </div>
              
              <div className="h-8 bg-gradient-to-t from-dark-surface to-transparent absolute bottom-0 w-full pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
