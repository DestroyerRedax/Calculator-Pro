import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates } from './currencyService';
import { Search, ArrowUpDown, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurrencyConverter() {
  const { data, isLoading } = useQuery({ queryKey: ['rates'], queryFn: fetchExchangeRates });
  const [amt, setAmt] = useState('1'); [from, setFrom] = useState('USD'); [to, setTo] = useState('BDT'); [picker, setPicker] = useState(null); [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!data) return [];
    return Object.keys(data.rates).map(c => ({ code: c, name: `${c} (Currency)` }))
      .filter(i => i.code.toLowerCase().includes(search.toLowerCase()))
      .sort((a,b) => a.code.localeCompare(b.code));
  }, [data, search]);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-dark-accent" /></div>;
  const res = (parseFloat(amt || 0) * (data.rates[to] / data.rates[from])).toFixed(2);

  return (
    <div className="h-full flex flex-col p-6 pt-24 bg-black">
      <div className="text-center mb-8"><h2 className="text-3xl font-bold">Currency</h2></div>
      <div className="space-y-4 max-w-sm mx-auto w-full">
        <div className="bg-dark-surface p-6 rounded-[32px] border border-white/5">
          <button onClick={() => setPicker('from')} className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{from}</button>
          <input type="number" value={amt} onChange={e => setAmt(e.target.value)} className="bg-transparent text-4xl font-bold w-full outline-none" />
        </div>
        <div className="flex justify-center -my-8 relative z-10"><button onClick={() => { setFrom(to); setTo(from); }} className="bg-dark-accent p-4 rounded-full text-white"><ArrowUpDown size={24} /></button></div>
        <div className="bg-dark-surface p-6 rounded-[32px] border border-white/5">
          <button onClick={() => setPicker('to')} className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{to}</button>
          <div className="text-4xl font-bold truncate">{res}</div>
        </div>
      </div>
      <AnimatePresence>
        {picker && (
          <div className="fixed inset-0 z-50 flex flex-col bg-black">
            <div className="p-4 pt-10 flex items-center gap-4 bg-dark-surface border-b border-white/5">
              <Search size={20} className="text-dark-accent" /><input autoFocus placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent py-2 text-xl outline-none" />
              <button onClick={() => setPicker(null)} className="text-dark-accent font-bold">Done</button>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {filtered.map(i => (
                <button key={i.code} onClick={() => { picker === 'from' ? setFrom(i.code) : setTo(i.code); setPicker(null); setSearch(''); }} 
                  className="w-full p-5 text-left flex justify-between border-b border-white/5"><span>{i.code}</span>{ (picker==='from'?from:to) === i.code && <Check size={20} className="text-dark-accent" />}</button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
