import React from 'react';
import { Menu } from 'lucide-react';
import { useStore } from '../../store/useStore';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const toggleSidebar = useStore(s => s.toggleSidebar);
  return (
    <div className="h-full w-full relative bg-black flex flex-col">
      <button onClick={toggleSidebar} className="absolute top-4 left-4 p-3 bg-dark-surface/60 backdrop-blur-md rounded-2xl z-40 border border-white/5 active:scale-90 transition-transform">
        <Menu size={24} />
      </button>
      <main className="flex-1 overflow-hidden">{children}</main>
      <Sidebar />
    </div>
  );
}
