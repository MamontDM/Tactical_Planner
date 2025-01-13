import React from 'react';


const MapSelectorContext = createContext();

const initState = { 
    selectedMapId: null;
    maps: {
        mapId: {
            objects: [];
        }
    }
}