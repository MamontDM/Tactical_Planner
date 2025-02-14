import React, { createContext, useReducer, useMemo } from 'react';



const MapContext = createContext();
    const initState = { 
        selectedMapId: null,
        maps: {},
        currentObjects: [],
        future: [],
    };
    console.log("Init state is:" , initState);

const MapReducer = (state, action) => {
    console.log(state);
    switch (action.type) {
        case 'ADD_MAP':
            return {
                ...state,
                selectedMapId: action.payload.mapName,
                maps: {
                    ...state.maps,
                    [action.payload.mapName]: {
                        mapName: action.payload.mapName,
                        value: action.payload.value,
                        objects: action.payload.objects || [],
                    },
                },
            };
        
        case 'SELECT_MAP':
            return {
                ...state, 
                selectedMapId: action.payload,
                currentObjects: state.maps[action.payload]?.objects || [],
                future: [],
            };
        case "REMOVE_MAP": {
            console.log('remove MAP');
            const {selectedMapId} = action.payload;

            const updateMaps = {...state.maps };
            delete updateMaps[selectedMapId];
            return {
                ...state,
                maps: updateMaps,
                selectedMapId: state.selectedMapId === selectedMapId ? null : state.selectedMapId,
                currentObjects: state.selectedMapId === selectedMapId ? [] : state.currentObjects,
                future: state.selectedMapId === selectedMapId ? [] : state.future,
            }
        }
        case 'ADD_OBJECT':{
            console.log('add OBJ');
            const { selectedMapId, maps, future } = state;
            const map = maps[selectedMapId];
            return {
                ...state,
                currentObjects: [...state.currentObjects, action.payload],
                maps:{
                    ...maps,
                    [selectedMapId]: {
                        ...map,
                        objects: [...map.objects, action.payload],
                    },
                },
                future: [],
                };
            }
            case 'REMOVE_OBJECT':{
                console.log('remove OBJ');
                const { selectedMapId, maps } = state;
                const map = maps[selectedMapId];
                const filteredObjects = state.currentObjects.filter(obj => obj.id !== action.payload.id)
                const filteredMapObjects = map.objects.filter(obj => obj.id !== action.payload.id);
                
                return {
                        ...state,
                        currentObjects: filteredObjects,
                        maps: {
                            ...maps,
                            [selectedMapId] : {
                                ...map,
                                objects : filteredMapObjects,
                            }
                        }
                  }
                };

            case "UNDO":{
                console.log('UNDO OBJ');
                if (state.currentObjects.length === 0) return state;
                const lastObject = state.currentObjects[state.currentObjects.length - 1];
                const newObjectsArray = state.currentObjects.slice(0, -1);
                return {
                    ...state,
                    currentObjects: newObjectsArray,
                    future: [lastObject, ...state.future],
                };
            }

        case "REDO":
            console.log('reDo OBJ');
                if (state.future.length === 0) return state;
            const restoredObject = state.future[0];
                return {
                    ...state,
                    currentObjects: [...state.currentObjects, restoredObject],
                    future: state.future.slice(1),
                };
       
            case "UPDATE_OBJECT":
                return {
                    ...state,
                    currentObjects: state.currentObjects.map((obj) =>
                        obj.id === action.payload.id
                        ? { ...obj, ...action.payload.updates }
                        : obj
                    ),
                };
                
        case "CLEAR_MAPLIST":
            console.log('clear List');
            return {
                ...state,
                selectedMapId: null,
                maps: {},
                currentObjects: [],
                future: [],
            };

        case "CLEAR_OBJECTS":
            console.log('Clear OBJ');
                return {
                    ...state,
                    currentObjects: [],
                    future: [],
                };
        case "SAVE_SNAPSHOT": {
            console.log('called');
            const {selectedMapId, maps, currentObjects} = state;
            if (!selectedMapId) return state;

            const snapshot = {
                timestamp: new Date().toISOString(),
                objects: [...currentObjects],
                metadata: {
                    mapName: maps[selectedMapId]?.mapName || "default",
                    totalObjects: currentObjects.length,
                },
            };
            console.log(snapshot);
            return {
                ...state,
                maps: {
                    ...maps,
                    [selectedMapId]: {
                        ...maps[selectedMapId],
                        snapshot,
                    }
                }
            };
        }
        case "LOAD_SNAPSHOT": {
            console.log("Loading saved snapshot");
            const { selectedMapId, maps } = state;
            if (!selectedMapId || !maps[selectedMapId]?.snapshot) return state;
        
            return {
                ...state,
                currentObjects: [...maps[selectedMapId].snapshot.objects],
                future: [], 
            };
        }
        default: 
        
            return state;
            }
        }


export function MapContextProvider({children}) {
    const [state, dispatch] = useReducer(MapReducer, initState);
    const isMapActive = useMemo(() => state.selectedMapId !== null, [state.selectedMapId]);
   
    return (
        <MapContext.Provider value={{state, dispatch, isMapActive }}>
            {children}
        </MapContext.Provider>
    );
}

export { MapContext };