import React, { createContext, useReducer } from 'react';



const MapContext = createContext();

const initState = { 
    selectedMapId: null,
    maps: {},
    currentObjects: [],
    future: [],
};

const MapReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_MAP':
            return {
                ...state, 
                selectedMapId: action.payload,
                currentObjects: state.maps[action.payload.id]?.objects || [],
                future: [],
            };

        case 'ADD_OBJECT':
            return {
                ...state,
                currentObjects: [...state.currentObjects, action.payload],
                maps: {
                    ...state.maps,
                    [action.payload.id]: {
                        ...state.maps[state.selectedMapId],
                        objects: [...state.maps[state.selectedMapId].objects, action.payload],
                    },
                },
                future: [],
            };
            case 'ADD_OBJECT':
                return {
                    ...state,
                    maps: {
                        ...state.maps,
                        [state.selectedMapId]:{
                            ...state.maps[state.selectedMapId],
                            objects: [
                                ...state.maps[state.selectedMapId].objects,
                                action.payload.object,
                            ],
                        },
                    },
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