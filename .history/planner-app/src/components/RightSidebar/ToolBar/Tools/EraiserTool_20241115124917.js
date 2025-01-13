import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { findClickedObject } from '../../../../utils/commonHelpers';

const EraiserTool = ({isActive}) => {
    
    const { canvasRef } = useContext(CanvasContext); 
    const { objects, dispatch } = useObjects();
    

    useEffect(() =>{
        console.log('isActive: true')
        if(isActive){
        const handleMouseDown = (event) => {
            
            console.log('click')
            const { x, y } = getCoordinates(event, canvasRef.current);
        
            const clickedObject = findClickedObject(x, y, objects);
        
            if (clickedObject) {
                console.log('Клик по объекту:', clickedObject);
                dispatch ({type: "REMOVE_OBJECT", payload: clickedObject.id});
            }
        };
        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }
}, [isActive, objects, dispatch]);

    return null;
};

export default EraiserTool;