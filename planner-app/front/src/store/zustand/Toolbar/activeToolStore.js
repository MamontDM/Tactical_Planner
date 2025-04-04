import { create } from "zustand";

export const useActiveToolStore = create((set) => ({
  activeTool: null,
  setActiveTool: (tool) => set({ activeTool: tool }),
  clearActiveTool: () => set({ activeTool: null }),
}));


