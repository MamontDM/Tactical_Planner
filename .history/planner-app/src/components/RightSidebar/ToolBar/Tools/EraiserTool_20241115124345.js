import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { findClickedObject } from '../../../../utils/commonHelpers';

const EraiserTool = ({isActive}) => {
    console.log('isActive: true')
    const { canvasRef } = useContext(CanvasContext); 
    const { objects, dispatch } = useObjects();
    

    useEffect(() =>{
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
    }, [objects, dispatch]);
}