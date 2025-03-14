import { useContext, useEffect, useRef } from 'react';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useMapStore } from '../../../../../store/zustand/MapStore/mapStore';

const ClearTool = ({isActive, onDeactivate})=> {
    const clearObjects = useMapStore((state) => state.clearObjects);

    console.log('called Clear tool!')
    const isCompleted = useRef(false);
    const { clearMainCanvas } = useContext(CanvasContext);

        useEffect (() =>  {
            if(isActive && !isCompleted.current) {
                clearObjects();
                clearMainCanvas();
                
                isCompleted.current = true;
                onDeactivate();
            }
        }, [isActive]);

    return null;
};

export default ClearTool;