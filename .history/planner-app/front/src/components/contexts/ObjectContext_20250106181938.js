// import React, {createContext, useReducer} from 'react';

// const ObjectContext = createContext();
// const initialState = {
//     objects: [],
//     future: [],
// };

// function objectReducer(state, action) {
//         switch (action.type){
//             case "ADD_OBJECT":
//                 return{
//                     ...state,
//                     objects: [...state.objects, action.payload],
//                     future: [],
//                 };
            
//         case "UNDO":{
//                 if (state.objects.length === 0) return state;
//                 const lastObject = state.objects[state.objects.length - 1];
//                 return {
//                     ...state,
//                     objects: state.objects.slice(0, -1),
//                     future: [lastObject, ...state.future],
//                 };
//             }
//         case "REDO":
//                 if (state.future.length === 0) return state;
//                 const restoredObject = state.future[0];
//                 return {
//                     ...state,
//                     objects: [...state.objects, restoredObject],
//                     future: state.future.slice(1),
//                 };

//         case "REMOVE_OBJECT":{
//                 const objectIndex = state.objects.findIndex((obj) => obj.id === action.payload);
//                 if(objectIndex === -1) return state;
//                 const removeObject = state.objects[objectIndex];
//                 const updateObjects = [
//                     ...state.objects.slice(0, objectIndex),
//                     ...state.objects.slice(objectIndex + 1),
//                  ];
//                  return {
//                     ...state,
//                     objects: updateObjects,
//                     future: [removeObject, ...state.future],
//                  };
//             }
          

//         case "UPDATE_OBJECT":
//                 return {
//                     ...state,
//                     objects: state.objects.map((obj) =>
//                         obj.id === action.payload.id
//                         ? { ...obj, ...action.payload.updates }
//                         : obj
//                     ),
//                 };

//         case "CLEAR_OBJECTS":
//                 return {
//                     ...state,
//                     objects: [],
//                     future: [],
//                 };
//             default:
//       throw new Error(`Unknown action type: ${action.type}`);
//     }
// }

//     export function ObjectProvider({children}) {
//         const [state, dispatch] = useReducer(objectReducer, initialState); 
//         return (
//             <ObjectContext.Provider value={{ state, dispatch}}>
//                 {children}
//             </ObjectContext.Provider>
//         );
//     }

//     export { ObjectContext };
