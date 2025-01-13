import React, { useEffect } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { findClickedObject } from '../../../../utils/commonHelpers';

const EraiserTool ({isActive}) => {
    const { dispatch } = useObjects();

    useEffect(() =>{
        const handleMouseDown = (event) => {
            console.log('click')
            const { x, y } = getCoordinates(event, canvasRef.current);
        
            const clickedObject = findClickedObject(x, y, objects);
        
            if (clickedObject) {
                console.log('Клик по объекту:', clickedObject);
            }
        };
    })
}