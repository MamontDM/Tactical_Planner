import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';
import { useObjects } from '../../../../hooks/useObjects';
import { clearCanvas } from '../../../../factories/CanvasRender';
import { drawObjects } from '../../../../factories/CanvasRender';

const MoveTool = ({isActive}) => {
    const { canvasRef } = useContext(CanvasContext);
    const { objects , dispatch } = useObjects();
    

    useEffect(() =>{
       if (isActive && canvasRef?.current){
            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;
            let initialX = 0;
            let initialY = 0;
            let selectedObject = null;


  const handleMouseDown = (event) => {
      const { x , y} = getCoordinates(event, canvasRef.current);
      selectedObject = findClickedObject(x , y , objects);

      if(selectedObject){
        isDragging = true;
        offsetX = x - selectedObject.x;
        offsetY = y - selectedObject.y;
        initialX = selectedObject.x;
        initialY = selectedObject.y;
    }
 };

 const handleMouseMove = (event) => {
    if (isDragging && selectedObject) {
        const { x, y } = getCoordinates(event, canvasRef.current);

        selectedObject.x = x - offsetX;
        selectedObject.y = y - offsetY;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        drawObjects(canvas, objects);
    }
};

    const handleMouseUp = () => {

        if (isDragging && selectedObject) {
            dispatch({
                type: 'UPDATE_OBJECT',
                payload: {
                    id: selectedObject.id,
                    updates: {
                            points: selectedObject.points.map(point =>({
                                x: point.x + dx,
                                y: point.y + dy,
                            })),
                    },
                },
            });
        }
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
    }, [isActive, objects, canvasRef, dispatch]);

    return null;
};

    
export default MoveTool;