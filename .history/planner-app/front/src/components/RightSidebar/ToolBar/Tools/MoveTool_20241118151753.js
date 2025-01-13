import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';

const MoveTool = ({isActive}) => {
    const {canvasRef} = useContext(CanvasContext);
    const { objects } = useObjects();

    useEffect(() =>{
        const handleMouseDown = (event) => {
            const { x, y } = getCoordinates(event, canvasRef.current);
            const clickedObject = findClickedObject(x, y, objects);
        }
    })

};

export default MoveTool;