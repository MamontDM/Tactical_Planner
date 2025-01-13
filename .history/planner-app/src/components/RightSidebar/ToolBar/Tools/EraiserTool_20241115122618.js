import React, { useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';

const EraiserTool ({isActive}) => {
    const { dispatch } = useObjects();

    useEffect(() =>{
        const handleMouseDown = (event) => {
            const { x, y } = getCoordinates(event, canvasRef.current);
        
            const clickedObject = findClickedObject(x, y, objects);
        
            if (clickedObject) {
                console.log('Клик по объекту:', clickedObject);
            }
        };
    })
}