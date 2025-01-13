import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';

const MoveTool = ({isActive}) => {
    const { canvasRef } = useContext(CanvasContext);
    const { objects } = useObjects();

    useEffect(() =>{
       if (isActive && canvasRef?.current){
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        let selectedObject = null;

            const handleMouseDown = (event) => {
                const { x , y} = getCoordinates(event, canvasRef.current);

                if(selectedObject){
                    isDragging = true;
                    offsetX = x - selectedObject.x;
                    offsetY = y- selectedObject.y;
                }
            };

            const handleMouseMove = (event) => {
                if (isDragging && selectedObject.current){
                    const { x , y} = getCoordinates(event, canvasRef.current);
                    selectedObject.x = x - offsetX;
                    selectedObject.y = y - offsetY;

                    CanvasRenderer.clearCanvas(canvasRef.current);
                    CanvasRenderer.drawObjects(objects);
                }
            }

       }
}, [isActive, objects, canvasRef]);

   return  null;
};

export default MoveTool;