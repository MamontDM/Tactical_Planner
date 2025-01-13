import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';
import { useObjects } from '../../../../hooks/useObjects';
import { clearCanvas } from '../../../../factories/CanvasRender';

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

 const handleMouseMove = (event) => {
    if (isDragging && selectedObject) {
        const { x, y } = getCoordinates(event, canvasRef.current);

        selectedObject.x = x - offsetX;
        selectedObject.y = y - offsetY;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        clearCanvas(canvasRef);
        objects.forEach((obj) => drawObject(context, obj));
    }
};

    const handleMouseUp = () => {
        if (isDragging && selectedObject) {
            // После завершения перетаскивания обновляем глобальное состояние через dispatch
            dispatch({
                type: 'UPDATE_OBJECT',
                payload: {
                    id: selectedObject.id,
                    updates: {
                        x: selectedObject.x,
                        y: selectedObject.y,
                    },
                },
            });
        }
        isDragging = false;
        selectedObject = null;
    };
};


export default MoveTool;