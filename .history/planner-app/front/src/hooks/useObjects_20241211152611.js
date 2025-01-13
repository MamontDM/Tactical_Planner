import { useContext } from 'react';
import { MapContext } from '../components/contexts/MapSelectorContext';

export function useObjects() {
    const context = useContext(MapContext);
    if(!context){
        throw new Error("useObjects dont Work");
    }
    const {state , dispatch} = context;
    return { objects: state.objects, dispatch};
}