import  { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { findClickedObject } from '../../../../../utils/commonHelpers';
import { useMapStore } from '../../../../../store/zustand/MapStore/mapStore'; 

const EraiserTool = ({isActive}) => {
    console.log('called Eraser tool!')
    const { canvasRef } = useContext(CanvasContext); 
    const allObjects = useMapStore((state) => state.getCurrentObjects());
    const removeObject = useMapStore((state) => state.removeObject);
    

    useEffect(() =>{
         if(isActive && canvasRef.current){
            const handleMouseDown = (event) => {
            const { x, y } = getCoordinates(event, canvasRef.current);
            const clickedObject = findClickedObject(x, y, allObjects);

        if (clickedObject) {
            removeObject(clickedObject.id);
        }else{
            console.log('Клик не попал в обьект');
        }
    };
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        return () => {
            canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        };
    }
}, [isActive, canvasRef]);

    return  null;
};

export default EraiserTool;