import { create } from "zustand";

const initState = { 
    selectedMapId: null,
    maps: {},
};

export const useMapStore = create((set, get) => ({
    ...initState,

    addMap: (newMap) => 
        set((state) => ({
            ...state,
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
        })),
       
    selectMap: (mapId) => 
        set((state) => ({
            ...state,
            selectedMapId: mapId,
        })),
        
    getMapSize: () => {
        const {selectedMapId, maps} = get();
        return selectedMapId && maps[selectedMapId] ? maps[selectedMapId].size : null;
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
        set((state) => ({
            ...state,
            maps: {
                ...state.maps,
                [state.selectedMapId]: {
                    ...state.maps[state.selectedMapId],
                    objects: [...state.maps[state.selectedMapId].objects, obj]
                },
            },
        })),

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
            const map = state.maps[state.selectedMapId];
            if(!map || map.objects.length === 0) return state;
                const lastObject = map.objects[map.objects.length - 1];
                return {
                    ...state,
                    maps: {
                    ...state.maps,
                    [state.selectedMapId]: {
                        ...map,
                        future: [...map.future, lastObject],
                        objects: map.objects.slice(0, -1),
                    }
                }
            } 
        }),
        redo: () => 
            set((state) => {
                const map = state.maps[state.selectedMapId];
                if (!map || map.future.length === 0) return state;
        
                const lastFutureObject = map.future[map.future.length - 1];
        
                return {
                    ...state,
                    maps: {
                        ...state.maps,
                        [state.selectedMapId]: {
                            ...map,
                            objects: [...map.objects, lastFutureObject],
                            future: map.future.slice(0, -1),
                        }
                    }
                };
            }),
        
}));