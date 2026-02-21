import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchExchangeRates } from './currencyService';
import { Search, ArrowUpDown, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// বিশ্বের সব কারেন্সি ও দেশের নাম (অংশ)
const fullCountryMap = {
  USD: "USA (Dollar)", BDT: "Bangladesh (Taka)", INR: "India (Rupee)", EUR: "Europe (Euro)", GBP: "UK (Pound)", JPY: "Japan (Yen)", AUD: "Australia (Dollar)", CAD: "Canada (Dollar)", 
  CNY: "China (Yuan)", SAR: "Saudi Arabia (Riyal)", AED: "UAE (Dirham)", PKR: "Pakistan (Rupee)", MYR: "Malaysia (Ringgit)", SGD: "Singapore (Dollar)", KWD: "Kuwait (Dinar)", 
  QAR: "Qatar (Riyal)", BHD: "Bahrain (Dinar)", OMR: "Oman (Riyal)", TRY: "Turkey (Lira)", RUB: "Russia (Ruble)", BRL: "Brazil (Real)", ZAR: "South Africa (Rand)"
  // API থেকে সব অটোমেটিক আসবে, এখানে নামগুলো সাজানো হয়েছে।
};

export default function CurrencyConverter() {
  const { data, isLoading } = useQuery({ queryKey: ['rates'], queryFn: fetchExchangeRates });
  const [amt, setAmt] = useState('1'); 
  const [from, setFrom] = useState('USD'); 
  const [to, setTo] = useState('BDT'); 
  const [picker, setPicker] = useState(null);
  const [search, setSearch] = useState('');

  const filteredRates = useMemo(() => {
    if (!data) return [];
    return Object.keys(data.rates)
      .map(code => ({ code, name: fullCountryMap[code] || `${code} (Global)` }))
      .filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.code.toLowerCase().includes(search.toLowerCase()))
      .sort((a,b) => a.name.localeCompare(b.name));
  }, [data, search]);

  if (isLoading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-dark-accent" /></div>;
  const res = (parseFloat(amt || 0) * (data.rates[to] / data.rates[from])).toFixed(2);

  return (
    <div className="h-full flex flex-col p-6 pt-24 bg-black">
      <div className="text-center mb-8"><h2 className="text-3xl font-bold">Currency</h2></div>
      <div className="space-y-4 max-w-sm mx-auto w-full">
        <div className="bg-dark-surface p-6 rounded-[32px] border border-white/5">
          <button onClick={() => { setPicker('from'); setSearch(''); }} className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{fullCountryMap[from] || from}</button>
          <input type="number" value={amt} onChange={e => setAmt(e.target.value)} className="bg-transparent text-4xl font-bold w-full outline-none" />
        </div>
        <div className="flex justify-center -my-8 relative z-10">
          <button onClick={() => { setFrom(to); setTo(from); }} className="bg-dark-accent p-4 rounded-full text-white active:scale-75"><ArrowUpDown size={24} /></button>
        </div>
        <div className="bg-dark-surface p-6 rounded-[32px] border border-white/5">
          <button onClick={() => { setPicker('to'); setSearch(''); }} className="text-[10px] font-bold text-dark-accent uppercase mb-2 block">{fullCountryMap[to] || to}</button>
          <div className="text-4xl font-bold truncate">{res}</div>
        </div>
      </div>

      <AnimatePresence>
        {picker && (
          <div className="fixed inset-0 z-50 flex flex-col bg-black">
             <div className="p-6 pt-12 flex items-center gap-4 bg-dark-surface border-b border-white/5">
                <Search size={20} className="text-dark-accent" />
                <input autoFocus placeholder="Search country or currency..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent py-2 text-xl outline-none" />
                <button onClick={() => setPicker(null)} className="text-dark-accent font-bold">Done</button>
             </div>
             <div className="flex-1 overflow-y-auto no-scrollbar">
                {filteredRates.map(i => (
                  <button key={i.code} onClick={() => { picker === 'from' ? setFrom(i.code) : setTo(i.code); setPicker(null); }} 
                    className={`w-full p-5 text-left flex justify-between border-b border-white/5 ${ (picker==='from'?from:to) === i.code ? 'bg-dark-accent/10 text-dark-accent' : ''}`}>
                    <span className="font-medium">{i.name}</span>
                    {(picker==='from'?from:to) === i.code && <Check size={20} />}
                  </button>
                ))}
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
