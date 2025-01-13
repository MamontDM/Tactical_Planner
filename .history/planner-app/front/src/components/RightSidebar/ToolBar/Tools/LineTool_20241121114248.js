import React, { useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';


const LineTool = ({isActive}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { dispatch } = useObjects();
    const contextRef = useRef(null);
    const isDrawing = useRef(false);
    const pointRef = useRef([]);

    useEffect(() => {

        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointEvents = 'auto';

            drawingCtx.lineWidth = 2;
            drawingCtx.strokeStyle = '#fff234';
            drawingCtx.canvas.style.cursor = 'crosshair';

            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = [];
                const { x, y } = getCoordinates(event, canvasRef.current);
                pointRef.current.push({x , y});
                drawingCtx.beginPath();
                drawingCtx.moveTo(x , y);
                
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, canvasRef.current);
                pointRef.current.push({x , y});
                drawingCtx.lineTo(x , y);
                drawingCtx.stroke();
            };

            const handleMouseUp = () => {
                if (isDrawing.current) {
                    isDrawing.current = false;
                    drawingCtx.closePath();

                    const newObject = {
                        id: Date.now(),
                        type: 'line',
                        points: [...pointRef.current],
                        color: drawingCtx.strokeStyle,
                        linewidth: drawingCtx.lineWidth
                    };
                    console.log(newObject);
                    dispatch({type: 'ADD_OBJECT', payload: newObject});
                }
            };

            canvasRef.current.addEventListener('mousedown', handleMouseDown);
            canvasRef.current.addEventListener('mousemove', handleMouseMove);
            canvasRef.current.addEventListener('mouseup', handleMouseUp);

            return () => {
                canvasRef.current.removeEventListener('mousedown', handleMouseDown);
                canvasRef.current.removeEventListener('mousemove', handleMouseMove);
                canvasRef.current.removeEventListener('mouseup', handleMouseUp);
               canvasRef.current.style.cursor = 'default';
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [isActive, canvasRef, dispatch]);



    return null;
};
export default LineTool;