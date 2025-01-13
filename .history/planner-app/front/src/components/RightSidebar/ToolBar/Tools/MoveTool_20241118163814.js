import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';
import { useObjects } from '../../../../hooks/useObjects';

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
                    console.log(selectedObject)
                    isDragging = true;
                    offsetX = x - selectedObject.x;
                    offsetY = y- selectedObject.y;
                }
            };

            const handleMouseMove = (event) => {
                if (isDragging && selectedObject){
                    console.log('Перемещаем объект...');
                    const { x , y} = getCoordinates(event, canvasRef.current);

                    const updateObjectCoords = {
                        ...selectedObject,
                        x: x - offsetX,
                        y: y - offsetY,
                    };

                    dispatch({
                        type: 'UPDATE_OBJECT',
                        payload: {
                            id: selectedObject.id,
                            updates: {
                                x: updateObjectCoords.x,
                                y: updateObjectCoords.y,
                            },
                        },
                    });

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
}, [isActive, objects, canvasRef, dispatch]);

   return  null;
};

export default MoveTool;