import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';
import { useObjects } from '../../../../hooks/useObjects';
import { clearCanvas } from '../../../../factories/CanvasRender';
import { drawObject } from '../../../../factories/CanvasRender';

const MoveTool = ({isActive}) => {
    const { canvasRef } = useContext(CanvasContext);
    const { objects , dispatch } = useObjects();
    

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
        offsetY = y - selectedObject.y;
    }
 };

 const handleMouseMove = () => {
    if (isDragging && selectedObject) {
        const { x, y } = getCoordinates(event, canvasRef.current);

        const dx = x - offsetX;
        const dy = y - offsetY;

        const upadateObject = {
            ...selectedObject,
            x: dx,
            y: dy,
        };
        if (updatedObject.type === 'line') {
            updatedObject.points = updatedObject.points.map(point => ({
                x: point.x + dx,
                y: point.y + dy,
            }));
        }
        
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        drawObject(canvasRef.current, objects);
    }
};

const handleMouseUp = () => {
    if (isDragging && selectedObject) {
        const dx = selectedObject.x - selectedObject.initialX;
        const dy = selectedObject.y - selectedObject.initialY;

        const updates = { x: selectedObject.x, y: selectedObject.y };

        if (selectedObject.type === 'line') {
            updates.points = selectedObject.points.map(point => ({
                x: point.x + dx,
                y: point.y + dy,
            }));
        }

        console.log('dispatching');
        dispatch({
            type: 'UPDATE_OBJECT',
            payload: {
                id: selectedObject.id,
                updates,
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