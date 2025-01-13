import React, { createContext, useReducer } from 'react';



const MapSelectorContext = createContext();

const initState = { 
    selectedMapId: null;
        maps: {},
    };

const MapReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_MAP':
            return {...state, 
                selectedMapId: action.payload
            };
        case 'ADD_MAP':
            return {...state,
                maps: {
                    ...state.maps,
                    [action.payload.id]: {
                        mapName : action.payload.mapName,
                        objects: [],
                    },
                },
            };
            case 'ADD_OBJECTS':
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
        <MapSelectorContext.Provider value={{state, dispatch}}>
            {children}
        </MapSelectorContext.Provider>
    );
}

export { MapSelectorContext };