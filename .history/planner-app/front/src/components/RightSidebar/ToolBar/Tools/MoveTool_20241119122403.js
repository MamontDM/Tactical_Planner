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
            let initialPoints = [];
            let selectedObject = null;


  const handleMouseDown = (event) => {
      const { x , y} = getCoordinates(event, canvasRef.current);
      selectedObject = findClickedObject(x , y , objects);

      if(selectedObject){
        isDragging = true;
        if(selectedObject.type === 'line'){
            offsetX = x - selectedObject.points[0].x;
            offsetY = y - selectedObject.points[0].y;
            initialPoints = selectedObject.points.map(point => ({ ...point }));
        }else{ 
            offsetX = x - selectedObject.x;
                        offsetY = y - selectedObject.y;
                        initialX = selectedObject.x;
                        initialY = selectedObject.y;
        }
        
    }
       
 };

 const handleMouseMove = (event) => {
    if (isDragging && selectedObject) {
        const { x, y } = getCoordinates(event, canvasRef.current);
        const dx = x - offsetX - initialX;
        const dy = y - offsetY - initialY;

        selectedObject.x = x - offsetX;
        selectedObject.y = y - offsetY;
        
        if (selectedObject.type === 'line') {
            selectedObject.points = initialPoints.map(point => ({
                x: point.x + dx - initialX,
                y: point.y + dy - initialY,
            }));
        }else {
            selectedObject.x = dx;
            selectedObject.y = dy; 
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        drawObjects(canvas, objects);
    }
};

const handleMouseUp = () => {
    if (isDragging && selectedObject) {
        const dx = selectedObject.x - initialX;
        const dy = selectedObject.y - initialY;
        dispatch({
            type: 'UPDATE_OBJECT',
            payload: {
                id: selectedObject.id,
                updates: {
                    ...(selectedObject.type === 'line' && {
                        points: initialPoints.map(point => ({
                            x: point.x + dx,
                            y: point.y + dy,
                        })),
                    }),
                    ...(!selectedObject.type === 'line' &&{
                        x: selectedObject.x,
                        y: selectedObject.y,
                    }),
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