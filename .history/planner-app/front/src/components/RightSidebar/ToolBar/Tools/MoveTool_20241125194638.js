import React, { useEffect, useContext } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';
import { useObjects } from '../../../../hooks/useObjects';
import { clearCanvas } from '../../../../factories/CanvasRender';
import { drawObjects } from '../../../../factories/CanvasRender';

const MoveTool = ({isActive}) => {
    const { canvasRef, getCanvasContext } = useContext(CanvasContext);
    const { objects , dispatch } = useObjects();
    

    useEffect(() =>{
       if (isActive && canvasRef?.current){
            let isDragging = false;
            const context = CanvasContext();
            let offsetX = 0;
            let offsetY = 0;
            let initialX = 0;
            let initialY = 0;
            let initialPoints = [];
            let selectedObject = null;


            const calculateInitialData = (event) => {
                const { x, y } = getCoordinates(event, canvasRef.current);
                selectedObject = findClickedObject(x, y, objects);

                if (selectedObject) {
                    isDragging = true;

                    if (selectedObject.type === 'line') {
                        offsetX = selectedObject.points[0].x - x;
                        offsetY = selectedObject.points[0].y - y;
                        initialX = x;
                        initialY = y;
                        initialPoints = selectedObject.points.map(point => ({ ...point }));
                    } else {
                        offsetX = x - selectedObject.points[0].x;
                        offsetY = y - selectedObject.points[0].y;
                        initialX = x;
                        initialY = y;
                        initialPoints = selectedObject.points.map(point => ({ ...point }));
                    }
                }
            };

            const updateObjectPosition = (dx, dy) => {

                selectedObject.points = initialPoints.map((point) => ({
                    x: point.x - dx,
                    y: point.y - dy,
                }));

                if(selectedObject.type === 'curve'){
                    const points = selectedObject.points; 
                    const from = points[points.length - 2];
                    const to = points[points.length - 1];
                        selectedObject.arrow = {
                            ...selectedObject.arrow,
                            fromX: from.x,
                            fromY: from.y,
                            toX: to.x,
                            toY: to.y,
                        };
                }
            };

            const prepareDispatchPayload = (dx, dy) => {
                if (!selectedObject) return null;
                return {
                    id: selectedObject.id,
                    updates: { points: initialPoints.map(point => ({ x: point.x - dx, y: point.y - dy })) },
                };
            };
            const redrawMainCanvas = () => {
                .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            const handleMouseDown = (event) => {
                calculateInitialData(event);
            };

            const handleMouseMove = (event) => {
                if (isDragging && selectedObject) {
                    const { x, y } = getCoordinates(event, canvasRef.current);
                    const dx = initialX - x;
                    const dy = initialY - y;
                    updateObjectPosition(dx, dy);
                    const canvas = canvasRef.current;
                    drawObjects(canvas, objects);
                    redrawMainCanvas();
                }
            };

            const handleMouseUp = (event) => {
                if (isDragging && selectedObject) {
                    const { x, y } = getCoordinates(event, canvasRef.current);
                    const dx = initialX - x;
                    const dy = initialY - y;

                    const payload = prepareDispatchPayload(dx, dy);
                    console.log(payload);
                    if (payload) {
                        dispatch({ type: 'UPDATE_OBJECT', payload });
                    }
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