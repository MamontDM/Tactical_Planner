import { useContext } from 'react';
import { MapContext } from '../components/contexts/MapSelectorContext';

export function useObjects() {
    const context = useContext(MapContext);
    if(!context){
        throw new Error("useObjects dont Work");
    }

    const {state , dispatch} = context;
    const selectedMap = state.maps[state.selectedMapId] || {};

console.log(selectedMap);
    return { 
        objects: state.currentObjects, 
        dispatch,
        snapshot: selectedMap.snapshot,
    };
}