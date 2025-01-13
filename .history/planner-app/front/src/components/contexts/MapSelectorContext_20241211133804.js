import React from 'react';


const MapSelectorContext = createContext();

const initState = { 
    selectedMapId: null;
        maps: {
            mapId: {
                mapName: null,
                objects: [],
            },
    },
};

const MapReducer = (state. action) => {
    switch (action.type) {
        case 'SELECT_MAP':
            return (...state, selectedMapId: action.payload);
        case 'ADD_OBJECT':
            return {
                ...state,
                maps: {
                    ...state.maps,
                    [state.selectedMapId]: {
                        ...state.maps[state.selectedMapId],
                        objects: [...state.maps[state.maps[state.selectedMapId].objects, action.payload],]
                    }
                }
            }
    }
}