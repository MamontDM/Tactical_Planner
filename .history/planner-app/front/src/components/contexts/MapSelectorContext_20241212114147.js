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
            console.log('added map');
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

        case 'ADD_OBJECT':
            return {
                ...state,
                currentObjects: [...state.currentObjects, action.payload],
                maps: {
                    ...state.maps,
                    [state.selectedMapId]: {
                        ...state.maps[state.selectedMapId],
                        objects: [...state.maps[state.selectedMapId].objects, action.payload],
                    },
                },
                future: [],
            };
            case "UNDO":{
                if (state.currentObjects.length === 0) return state;
                const lastObject = state.currentObjects[state.objects.length - 1];
                return {
                    ...state,
                    currentObjects: state.currentObjects.slice(0, -1),
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
            console.log("CLEAR_MAPLIST called");
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
   
    useEffect(() => {
        console.log('Updated maps:', state.maps);
    }, [state.maps]);

    return (
        <MapContext.Provider value={{state, dispatch}}>
            {children}
        </MapContext.Provider>
    );
}

export { MapContext };