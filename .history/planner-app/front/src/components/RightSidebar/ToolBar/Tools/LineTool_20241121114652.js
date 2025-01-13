import React, { useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';


const LineTool = ({isActive}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const contextRef = useRef(null);
    const isDrawing = useRef(false);
    const pointRef = useRef([]);

    useEffect(() => {

        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';

            drawingCtx.lineWidth = 2;
            drawingCtx.strokeStyle = '#fff234';
            drawingCtx.canvas.style.cursor = 'crosshair';

            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = [];
                const { x, y } = getCoordinates(event, drawingCanvas);
                console.log(x , y)
                pointRef.current.push({x , y});
                drawingCtx.beginPath();
                drawingCtx.moveTo(x , y);
                
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
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

            drawingCanvas.addEventListener('mousedown', handleMouseDown);
            drawingCanvas.addEventListener('mousemove', handleMouseMove);
            drawingCanvas.addEventListener('mouseup', handleMouseUp);

            return () => {
                drawingCanvas.removeEventListener('mousedown', handleMouseDown);
                drawingCanvas.removeEventListener('mousemove', handleMouseMove);
                drawingCanvas.removeEventListener('mouseup', handleMouseUp);
                drawingCanvas.style.cursor = 'default';
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [isActive, canvasRef, dispatch]);



    return null;
};
export default LineTool;