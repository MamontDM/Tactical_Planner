import { useEffect, useRef } from 'react';
import { useMapStore } from "@/store/zustand/MapStore/mapStore";

const UndoTool = ({isActive, onDeactivate}) => {
    const isCompleted = useRef(false)
    const undo = useMapStore.getState().undo;
    
    useEffect (() =>  {
            if(isActive && !isCompleted.current) {
                console.log('called')
;                undo();
                isCompleted.current = true;
                onDeactivate();
            }
        }, [isActive]);
       
    return null;
};

export default UndoTool;