import { create } from 'zustand';
export const useStore = create((set) => ({
  isSidebarOpen: false,
  activeTool: 'calculator',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  setActiveTool: (tool) => set({ activeTool: tool, isSidebarOpen: false }),
}));
