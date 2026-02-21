import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CustomDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      <label className="text-[10px] uppercase font-bold text-dark-muted mb-1 block ml-1 tracking-widest">{label}</label>
      <button onClick={() => setOpen(!open)} className="w-full bg-dark-surface p-4 rounded-2xl flex justify-between items-center border border-white/5 active:scale-95 transition-transform">
        <span className="text-white">{value}</span><ChevronDown size={18} className="text-dark-accent" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.ul initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute z-20 w-full mt-2 max-h-48 overflow-y-auto bg-dark-surface border border-white/10 rounded-2xl shadow-2xl no-scrollbar">
              {options.map(o => (
                <li key={o} onClick={() => { onChange(o); setOpen(false); }} className={`p-4 text-center border-b border-white/5 last:border-0 ${value === o ? 'text-dark-accent font-bold' : 'text-white'}`}>{o}</li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
