import { useEffect, useContext, useState } from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { findClickedObject } from '../../../../../utils/commonHelpers';
import { drawObjects } from '../../../../../factories/CanvasRender';
import { useMapStore } from '../../../../../store/zustand/MapStore/mapStore';

const MoveTool = ({isActive}) => {
    console.log('called MoveTool tool!')
    const [objects, setObjects] = useState([]);
    const { canvasRef, getCanvasContext } = useContext(CanvasContext);
    const currentObjects = useMapStore.getState().getCurrentObjects;
    const updateObject = useMapStore.getState().updateObject;

    useEffect(() => {
        if (isActive) {
            setObjects(currentObjects()); 
        }
    }, [isActive, objects]);


    useEffect(() =>{
       if (isActive && canvasRef?.current){
            let isDragging = false;
            const mainCtx = getCanvasContext();
            let offsetX = 0;
            let offsetY = 0;
            let initialX = 0;
            let initialY = 0;
            let initialPoints = [];
            let selectedObject = null;
            let animationFrame = null;


            const calculateInitialData = (event) => {
                const { x, y } = getCoordinates(event, canvasRef.current);
                selectedObject = findClickedObject(x, y, objects);
                if (selectedObject) {
                    isDragging = true;
                    initialX = x;
                    initialY = y;
            
                    if (selectedObject.type === 'vision' || selectedObject.type === 'icon' || selectedObject.type === 'text') {
                        offsetX = x - selectedObject.x;
                        offsetY = y - selectedObject.y;
                        initialPoints = [{ x: selectedObject.x, y: selectedObject.y }];
                    } else {
                        offsetX = x - selectedObject.points[0].x;
                        offsetY = y - selectedObject.points[0].y;
                        initialPoints = selectedObject.points.map(point => ({ ...point }));
                    }
                }
            };

            const updateObjectPosition = (dx, dy) => {
                if (selectedObject.points) {
                    selectedObject.points = initialPoints.map((point) => ({
                        x: point.x - dx,
                        y: point.y - dy,
                    }));
                };
                if (selectedObject.type === 'curve') {
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
                if (selectedObject.x !== undefined && selectedObject.y !== undefined) {
                    selectedObject.x = initialPoints[0].x - dx;
                    selectedObject.y = initialPoints[0].y - dy;
                    }
            
                }

            const prepareDispatchPayload = (dx, dy) => {
                if (!selectedObject) return null;
                const updatedObject = {
                    ...selectedObject,
                    points: selectedObject.points 
                        ? initialPoints.map(point => ({ x: point.x - dx, y: point.y - dy }))
                        : undefined,
                    x: selectedObject.x !== undefined ? initialPoints[0].x - dx : undefined,
                    y: selectedObject.y !== undefined ? initialPoints[0].y - dy : undefined,
                };
            return updatedObject;
            };

            const handleMouseDown = (event) => {
                calculateInitialData(event);
            };

            const handleMouseMove = (event) => {
                if (!isDragging || !selectedObject) return;
                
               
                        const { x, y } = getCoordinates(event, canvasRef.current);
                        const dx = initialX - x;
                        const dy = initialY - y;
                        updateObjectPosition(dx, dy);
                        drawObjects(canvasRef.current, objects);

                 
            };

            const handleMouseUp = (event) => {
                if (isDragging && selectedObject) {
                    const { x, y } = getCoordinates(event, canvasRef.current);
                    const dx = initialX - x;
                    const dy = initialY - y;
            
                    const updatingObject = prepareDispatchPayload(dx, dy);
                    console.log(updatingObject);
                    if (updatingObject) {
                        updateObject(updatingObject);
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
    }, [isActive, currentObjects, objects, canvasRef]);

    return null;
};

    
export default MoveTool;