import { create } from 'zustand';
export const useStore = create((set) => ({
  isSidebarOpen: false,
  activeTool: 'calculator',
  isScientific: false, // সাইয়েন্টিফিক মোড ট্র্যাক করবে
  history: JSON.parse(localStorage.getItem('calc_history') || '[]'),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  toggleScientific: () => set((s) => ({ isScientific: !s.isScientific })),
  setActiveTool: (tool) => set({ activeTool: tool, isSidebarOpen: false }),
  addHistory: (item) => set((s) => {
    const newHist = [item, ...s.history].slice(0, 20);
    localStorage.setItem('calc_history', JSON.stringify(newHist));
    return { history: newHist };
  }),
  clearHistory: () => { localStorage.removeItem('calc_history'); set({ history: [] }); },
}));
