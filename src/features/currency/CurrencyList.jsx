import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { countryMap } from './currencyService';

export default function CurrencyList({ rates, selected, onSelect }) {
  const [q, setQ] = useState('');
  const list = useMemo(() => Object.keys(rates).map(c => ({ c, n: countryMap[c] || `${c} (Global)` }))
    .filter(i => i.n.toLowerCase().includes(q.toLowerCase())).sort((a,b) => a.n.localeCompare(b.n)), [q, rates]);
  return (
    <div className="h-[400px] flex flex-col">
      <div className="p-4 bg-dark-surface sticky top-0 border-b border-white/5">
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted" size={16} /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="w-full bg-dark-bg p-2 pl-10 rounded-xl outline-none border border-white/10" /></div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {list.map(i => <button key={i.c} onClick={() => onSelect(i.c)} className={`w-full p-4 text-left border-b border-white/5 ${selected === i.c ? 'text-dark-accent font-bold bg-white/5' : ''}`}>{i.n}</button>)}
      </div>
    </div>
  );
}
