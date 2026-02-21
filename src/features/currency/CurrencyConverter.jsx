import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates, countryMap } from './currencyService';
import CurrencyList from './CurrencyList';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurrencyConverter() {
  const { data, isLoading } = useQuery({ queryKey: ['rates'], queryFn: fetchExchangeRates });
  const [amt, setAmt] = useState('1'); 
  const [from, setFrom] = useState('USD'); 
  const [to, setTo] = useState('BDT'); 
  const [picker, setPicker] = useState(null);
  
  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-dark-accent" /></div>;
  const result = data ? (parseFloat(amt || 0) * (data.rates[to] / data.rates[from])).toFixed(2) : "0.00";

  return (
    <div className="h-full flex flex-col p-6 pt-24 justify-start space-y-6 bg-black">
      <div className="text-center"><h2 className="text-3xl font-bold">Currency</h2></div>
      <div className="space-y-4 max-w-sm mx-auto w-full">
        <div className="bg-dark-surface p-6 rounded-[32px] border border-white/5">
          <button onClick={() => setPicker('from')} className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{countryMap[from] || from}</button>
          <input type="number" value={amt} onChange={e => setAmt(e.target.value)} className="bg-transparent text-4xl font-bold w-full outline-none" />
        </div>
        <div className="flex justify-center -my-8 relative z-10">
          <button onClick={() => { setFrom(to); setTo(from); }} className="bg-dark-accent p-4 rounded-full text-white shadow-2xl active:scale-75 transition-transform"><ArrowUpDown size={24} /></button>
        </div>
        <div className="bg-dark-surface p-6 rounded-[32px] border border-white/5">
          <button onClick={() => setPicker('to')} className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{countryMap[to] || to}</button>
          <div className="text-4xl font-bold truncate">{result}</div>
        </div>
      </div>
      <AnimatePresence>
        {picker && (
          <div className="fixed inset-0 z-50 flex items-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPicker(null)} className="absolute inset-0 bg-black/80" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.15 }} className="relative w-full bg-dark-surface rounded-t-[40px] overflow-hidden">
              <CurrencyList rates={data.rates} selected={picker === 'from' ? from : to} onSelect={c => { picker === 'from' ? setFrom(c) : setTo(c); setPicker(null); }} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
