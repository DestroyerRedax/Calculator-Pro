import { create } from 'zustand';
export const useStore = create((set) => ({
  isSidebarOpen: false,
  activeTool: 'calculator',
  history: JSON.parse(localStorage.getItem('calc_history') || '[]'),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  setActiveTool: (tool) => set({ activeTool: tool, isSidebarOpen: false }),
  addHistory: (item) => set((s) => {
    const newHistory = [item, ...s.history].slice(0, 20);
    localStorage.setItem('calc_history', JSON.stringify(newHistory));
    return { history: newHistory };
  }),
  clearHistory: () => {
    localStorage.removeItem('calc_history');
    set({ history: [] });
  },
}));
