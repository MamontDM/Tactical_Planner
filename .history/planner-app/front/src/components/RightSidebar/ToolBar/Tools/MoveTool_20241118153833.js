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
                selectedObject = findClickedObject(x , y , objects);
                if(selectedObject){
                    isDragging = true;
                    offsetX = x - selectedObject.x;
                    offsetY = y- selectedObject.y;
                    console.log(selectedObject.current)
                }
            };

            const handleMouseMove = (event) => {
                if (isDragging && selectedObject.current){
                    console.log('move');
                    const { x , y} = getCoordinates(event, canvasRef.current);
                    selectedObject.x = x - offsetX;
                    selectedObject.y = y - offsetY;

                    CanvasRenderer.clearCanvas(canvasRef.current);
                    CanvasRenderer.drawObjects(objects);
                }
            };

            const handleMouseUp = () => { 
                isDragging = false;
                selectedObject = null;
            };
            canvasRef.current.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            
            return () => {
                canvasRef.current.removeEventListener('mousedown', handleMouseDown);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
       }
}, [isActive, objects, canvasRef]);

   return  null;
};

export default MoveTool;