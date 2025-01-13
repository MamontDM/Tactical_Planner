import React, { useEffect, useRef, useContext  } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { drawObjects} from '../../../../factories/CanvasRender';


const LineTool = ({isActive, commonSettings, onChangeCommonSettings}) => {
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

            drawingCtx.lineWidth = commonSettings.lineWidth;
            drawingCtx.strokeStyle = commonSettings.color;
            console.log(commonSettings.lineWidth);
            drawingCtx.canvas.style.cursor = 'crosshair';

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = [];
                const { x, y } = getCoordinates(event, drawingCanvas);
                console.log(x , y)
                pointRef.current.push({x , y});
                drawingCtx.beginPath();
                drawingCtx.moveTo(x , y);
                drawingCtx.strokeStyle = commonSettings.color;
                drawingCtx.lineWidth = commonSettings.lineWidth;
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
                pointRef.current.push({x , y});
                drawingCtx.lineTo( Math.round(x), Math.round(y));
                drawingCtx.stroke();
                drawingCtx.strokeStyle = commonSettings.color;
                drawingCtx.lineWidth = commonSettings.lineWidth;
                console.log(drawingCtx.lineWidth);
            };

            const handleMouseUp = () => {
                if (isDrawing.current) {
                    isDrawing.current = false;
                    drawingCtx.closePath();

                    const newObject = {
                        id: Date.now(),
                        type: 'line',
                        points: [...pointRef.current],
                        color: commonSettings.color,
                        lineWidth: commonSettings.lineWidth
                    };
                    dispatch({type: 'ADD_OBJECT', payload: newObject});
                }
                clearDrawingCanvas();
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
    }, [isActive, canvasRef, dispatch, commonSettings, onChangeCommonSettings]);

    return null;
};
export default LineTool;