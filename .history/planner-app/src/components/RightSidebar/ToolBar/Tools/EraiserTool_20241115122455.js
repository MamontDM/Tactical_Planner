import React, { useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';

const EraiserTool ({isActive}) => {
    const { canvasRef } = useContext(CanvasContext); 
    const { dispatch } = useObjects();
    const contextRef = useRef(null);
    const isDrawing = useRef(false);
    const pointRef = useRef([]);

    useEffect(() =>{
        
    })
}