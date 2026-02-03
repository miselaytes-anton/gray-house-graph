import { create } from 'zustand';

interface AppState {
  selectedNodeId: string | null;
  chronologyFilter: 'ALL' | 'PART_1' | 'PART_2'; // Extend as needed based on logic
  selectNode: (id: string | null) => void;
  setFilter: (filter: 'ALL' | 'PART_1' | 'PART_2') => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedNodeId: null,
  chronologyFilter: 'ALL',
  selectNode: (id) => set({ selectedNodeId: id }),
  setFilter: (filter) => set({ chronologyFilter: filter }),
}));
