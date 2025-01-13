import React, {createContext, useContext, useReducer} from 'react';

const ObjectContext = createContext();

const initialState = [];

function objectReducer(state, action) {
        switch (action.type){
            case "ADD_OBJECT":
                return [...state, action.payload];
            case "REMOVE_OBJECT":
                return state.filter((obj) => obj.id !== action.payload);
            case "UPDATE_OBJECT":
                return state.map((obj) =>
                obj.id === action.payload.id ? { ...obj, ...action.payload.updates } : obj
            ); 
        }
}