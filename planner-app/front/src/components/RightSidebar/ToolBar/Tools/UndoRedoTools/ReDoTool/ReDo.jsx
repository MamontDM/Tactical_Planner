import { useEffect, useRef } from 'react';
import { useMapStore } from "@/store/zustand/MapStore/mapStore";

const ReDoTool = ({ isActive,  onDeactivate }) => {
    const isCompleted = useRef(false)
    const redo = useMapStore((state) => state.redo);
    useEffect (() =>  {
        if(isActive && !isCompleted.current) {
            isCompleted.current = true;
            redo();
            onDeactivate();
        }
    }, [isActive]);
    return null;
};

export default ReDoTool;