import React, {createContext, useReducer} from 'react';

const ObjectContext = createContext();

const initialState = [];

function objectReducer(state, action) {
        switch (action.type){
            case "ADD_OBJECT":
                return [...state, {...action.payload}];
            case "REMOVE_OBJECT":
                return state.filter((obj) => obj.id !== action.payload);
            case "UPDATE_OBJECT":
                return state.map((obj) =>
                obj.id === action.payload.id ? { ...obj, ...action.payload.updates } : obj);
            default:
      throw new Error(`Unknown action type: ${action.type}`);
    }
}

    export function ObjectProvider({children}) {
        const [state, dispatch] = useReducer(objectReducer, initialState); 
        return (
            <ObjectContext.Provider value={{objects: state, dispatch}}>
                {children}
            </ObjectContext.Provider>
        );
    }

    export { ObjectContext};