import React, { createContext, useReducer, useEffect } from 'react';



const MapContext = createContext();

const initState = { 
    selectedMapId: null,
    maps: {},
    currentObjects: [],
    future: [],
};

const MapReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_MAP':
            return {
                ...state,
                maps: {
                    ...state.maps,
                    [action.payload.id]: {
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
        case 'ADD_OBJECT':{
            const { selectedMapId, maps, future } = state;
            const map = maps[selectedMapId];
            console.log('add obj');
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
                                object : filteredMapObjects,
                            }
                        }
                  }
                };

            case "UNDO":{
                if (state.currentObjects.length === 0) return state;
                
                const lastObject = state.currentObjects[state.currentObjects.length - 1];
                console.log('Last object is:', lastObject);
                const newObjectsArray = state.currentObjects.slice(0, -1);
                console.log('new arr object is:', newObjectsArray);
                return {
                    ...state,
                    currentObjects: newObjectsArray,
                    future: [lastObject, ...state.future],
                };
            }

        case "REDO":
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
            return {
                ...state,
                selectedMapId: null,
                maps: {},
                currentObjects: [],
                future: [],
            };

        case "CLEAR_OBJECTS":
                return {
                    ...state,
                    currentObjects: [],
                    future: [],
                };
        default: 
            return state;
            }
        }


export function MapContextProvider({children}) {
    const [state, dispatch] = useReducer(MapReducer, initState);
   
    return (
        <MapContext.Provider value={{state, dispatch}}>
            {children}
        </MapContext.Provider>
    );
}

export { MapContext };