import { create } from "zustand";

const useActiveToolStore = create((set) => ({
  activeTool: null,
  setActiveTool: (tool) => set({ activeTool: tool }),
  clearActiveTool: () => set({ activeTool: null }),
}));

export default useActiveToolStore;
