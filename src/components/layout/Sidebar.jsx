*import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Calendar, Landmark, Activity, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

const menu = [
  { id: 'calculator', name: 'Smart Calc', icon: Calculator },
  { id: 'age', name: 'Age Calc', icon: Calendar },
  { id: 'currency', name: 'Currency', icon: Landmark },
  { id: 'bmi', name: 'BMI Calc', icon: Activity },
];

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar, activeTool, setActiveTool } = useStore();
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop - Click here to close */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={closeSidebar} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />
          
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.15 }}
            className="fixed top-0 left-0 h-full w-[280px] bg-dark-surface z-50 p-6 flex flex-col shadow-2xl">
            
            <div className="flex justify-between items-center mb-10 pt-4">
              <h2 className="text-xl font-bold text-dark-accent">Utility Pro</h2>
              <button onClick={closeSidebar} className="p-2"><X size={24} className="text-white" /></button>
            </div>

            <div className="space-y-2">
              {menu.map(i => (
                <button key={i.id} onClick={() => setActiveTool(i.id)} 
                  className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTool === i.id ? 'bg-dark-accent text-white' : 'text-dark-muted hover:bg-white/5'}`}>
                  <i.icon size={22} /><span className="font-semibold">{i.name}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-auto pb-6 text-center border-t border-white/5 pt-6">
               <p className="text-[10px] tracking-[0.3em] text-dark-muted uppercase font-black">Powered by <span className="text-dark-accent">Mythbrix</span></p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Calendar, Landmark, Activity, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

const menu = [
  { id: 'calculator', name: 'Smart Calc', icon: Calculator },
  { id: 'age', name: 'Age Calc', icon: Calendar },
  { id: 'currency', name: 'Currency', icon: Landmark },
  { id: 'bmi', name: 'BMI Calc', icon: Activity },
];

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar, activeTool, setActiveTool } = useStore();
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.05 }} onClick={closeSidebar} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.1, ease: "linear" }} className="fixed top-0 left-0 h-full w-[260px] bg-dark-surface z-50 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-10 pt-4"><h2 className="text-xl font-bold text-dark-accent">Utility Pro</h2><X onClick={closeSidebar} /></div>
            <div className="space-y-1">
              {menu.map(i => (
                <button key={i.id} onClick={() => setActiveTool(i.id)} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTool === i.id ? 'bg-dark-accent text-white' : 'text-dark-muted hover:bg-white/5'}`}>
                  <i.icon size={20} /><span className="font-semibold">{i.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-auto pb-6 text-center border-t border-white/5 pt-6">
               <p className="text-[10px] tracking-[0.3em] text-dark-muted uppercase font-black">Powered by <span className="text-dark-accent">Mythbrix</span></p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
