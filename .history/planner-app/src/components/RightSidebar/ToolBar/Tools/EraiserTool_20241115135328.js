import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { findClickedObject } from '../../../../utils/commonHelpers';

const EraiserTool = ({isActive}) => {
    
    const { canvasRef } = useContext(CanvasContext); 
    const { objects, dispatch } = useObjects();
    

    useEffect(() =>{
         if(isActive && canvasRef.current){
            const handleMouseDown = (event) => {
            const { x, y } = getCoordinates(event, canvasRef.current);
            console.log("Objects in state:", objects);
            
            const clickedObject = findClickedObject(x, y, objects);
            
            if (clickedObject) {
                console.log('Клик по объекту:', clickedObject);
                // dispatch({type: "REMOVE_OBJECT", payload: clickedObject.id});
            }else{
                console.log('Клик не попал в обьект');
            }
        };

        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        return () => {
            canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        };
    }
}, [isActive, objects, canvasRef, dispatch]);

    return  null;
};

export default EraiserTool;