import React from 'react';


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
};