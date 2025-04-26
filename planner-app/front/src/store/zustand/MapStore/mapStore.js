import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware"

const initState = { 
    selectedMapId: null,
    maps: {},
    mapStoreList: [],
};

export const useMapStore = create(
    subscribeWithSelector((set, get) => ({
    ...initState,

    addMap: (newMap) => set((state) => {
        return {
          selectedMapId: newMap.id,
          maps: {
            ...state.maps,
            [newMap.id]: {
              id: newMap.id,
              name: newMap.name,
              value: newMap.value,
              size: newMap.size,
              objects: newMap.objects || [],
              url: newMap.url,
              future: [],
            },
          },
        };
      }),
       
    selectMap: (mapId) => {
        set({ selectedMapId: mapId });
    },
        
    getMapSize: () => {
        const {selectedMapId, maps} = get();
        return selectedMapId && maps[selectedMapId] ? maps[selectedMapId].size : null;
    },
    getActiveMap: () => {
        const {selectedMapId, maps} = get();
        return maps[selectedMapId].name;
    },

    removeMap: (mapId) => 
        set((state) => {
            const newMaps = {...state.maps};
            delete newMaps[mapId]; 
            return {
                ...state,
                maps: newMaps, 
                selectedMapId: state.selectedMapId === mapId ? null : state.selectedMapId,
            };
        }), 
        
    removeAllMap: (mapId) => 
        set((state) => {
            return {
                ...state,
                maps: {},
            };
        }),

    addObject: (obj) => 
        set((state) => {
            const { selectedMapId, maps } = state;
                const map = maps[selectedMapId];
                if (!map) return state;
            return {
                maps: {
                ...maps,
                [selectedMapId]: {
                    ...map,
                    objects: [...map.objects, obj]
                },
            },
        };
    }),

    getCurrentObjects: () => {
        const {selectedMapId, maps} = get();
        return selectedMapId ? maps[selectedMapId]?.objects || [] : [];
    }, 
    
    removeObject: (objId) => 
        set((state) => ({
            ...state,
            maps: {
                ...state.maps,
                [state.selectedMapId]: {
                    ...state.maps[state.selectedMapId],
                    objects: state.maps[state.selectedMapId].objects.filter(obj => obj.id !== objId),
                },
            },
        })),

    updateObject: (object) => 
        set((state) => ({
            ...state,
            maps: {
                ...state.maps,
                [state.selectedMapId]: {
                    ...state.maps[state.selectedMapId],
                    objects: state.maps[state.selectedMapId].objects.map((obj) => 
                    obj.id === object.id ? {...obj, ...object } : obj
                ),
            },
        },
    })),
    clearObjects: () => 
        set((state) => ({
            ...state,
            maps: {
                ...state.maps,
                [state.selectedMapId]: {
                    ...state.maps[state.selectedMapId],
                    objects: [],
                },
            },
        })),

    undo: () => 
        set((state) => {
            const { selectedMapId, maps } = state;
            const map = maps[selectedMapId];
            if (!map || map.objects.length === 0) return state;
            const last = map.objects.at(-1);
            if (!last) return state;


                return {
                    maps: {
                    ...state.maps,
                    [selectedMapId]: {
                        ...map,
                        future: [...map.future, last],
                        objects: map.objects.slice(0, -1),
                    },
                },
            };
        }),
        redo: () => 
            set((state) => {
                const { selectedMapId, maps } = state;
                const map = maps[selectedMapId];
                if (!map || map.future.length === 0) return state;

                const last = map.future.at(-1);
                if (!last) return state;
        
                return {
                    maps: {
                        ...maps,
                        [selectedMapId]: {
                            ...map,
                            objects: [...map.objects, last],
                            future: map.future.slice(0, -1),
                        }
                    }
                };
            }),
    
    getCurrentSnapShot: () => {
        const { selectedMapId, maps } = get();
        const activeMap = maps[selectedMapId];
        if(!activeMap) return null;
            const {future, ...mapData} = activeMap;
            return {
                id: selectedMapId,
                ...mapData,
            }
        },
    })
));

  
  