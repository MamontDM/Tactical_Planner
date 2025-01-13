import React from 'react';


const MapSelectorContext = createContext();

const initState = { 
    selectedMapId: null;
        maps: {},
    };

const MapReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_MAP':
            return (...state, 
                selectedMapId: action.payload
            );
        case 'ADD_OBJECT':
            return {...state,
                maps: {
                    ...state.maps,
                    [action.payload.id]: {
                        mapName : action.payload.mapName,
                        objects: [],
                    },
                },
            };
        };
};