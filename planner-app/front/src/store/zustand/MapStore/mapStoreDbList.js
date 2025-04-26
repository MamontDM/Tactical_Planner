import { create } from "zustand";


export const useMapStoreListDb = create((set, get) => ({

    mapStoreList: [],

    removeFromMapList: (mongoId) => {
        return set((state) => {
          const filtered = state.mapStoreList.filter((map) => map._id !== mongoId);
          return {
            mapStoreList: filtered,
          };
        });
      },
      
    
    addToMapList: (map) => set({
      mapStoreList:  map,
    }),
}));