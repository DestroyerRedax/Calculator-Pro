import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Calendar, Landmark, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

const menuItems = [
  { id: 'calculator', name: 'Calculator', icon: Calculator },
  { id: 'age', name: 'Age Calc', icon: Calendar },
  { id: 'currency', name: 'Currency', icon: Landmark },
];

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar, activeTool, setActiveTool } = useStore();
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeSidebar} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25 }} className="fixed top-0 left-0 h-full w-[280px] bg-dark-surface z-50 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-10"><h2 className="text-xl font-bold">Pro Suite</h2><X onClick={closeSidebar} className="text-dark-muted" /></div>
            <nav className="space-y-2">
              {menuItems.map(item => (
                <button key={item.id} onClick={() => setActiveTool(item.id)} className={`w-full flex items-center space-x-4 p-4 rounded-2xl ${activeTool === item.id ? 'bg-dark-accent text-white' : 'text-dark-muted hover:bg-dark-button'}`}>
                  <item.icon size={22} /> <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] tracking-widest text-dark-muted uppercase font-bold">Powered by <span className="text-dark-accent">Mythbrix</span></p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
