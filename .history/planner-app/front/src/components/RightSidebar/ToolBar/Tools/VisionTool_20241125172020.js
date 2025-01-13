import React, { useEffect, useContext, useRef } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';
import { useObjects } from '../../../../hooks/useObjects';
import { clearCanvas } from '../../../../factories/CanvasRender';
import { drawObjects } from '../../../../factories/CanvasRender';

const drawCircle = (context, x, y, radius, lineWidth, strokeStyle) => {
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
};


const VisionTool = ({isActive}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const radius = useRef(250);
    const points = useRef([]);
    const lineWidth = 2;
    const strokeStyle = "#fff234";

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';

            drawingCtx.lineWidth = lineWidth.current;
            drawingCtx.strokeStyle = strokeStyle.current;
            drawingCtx.canvas.style.cursor = 'crosshair';

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            const handleMouseDown = (event) => {
                const {x , y} = getCoordinates(event, drawingCanvas);
                points.current.push({x , y});
                drawCircle(drawingCtx, x, y, radius.current, lineWidth, strokeStyle);
                
                const newObject = {
                    id: Date.now(),
                    type: "radar",
                    points: [...points.current],
                    color: strokeStyle,
                    lineWidth: lineWidth,
                };
                dispatch({ type: "ADD_OBJECT", payload: newObject });
                points.current = [];
                redrawMainCanvas();
            };
            
            drawingCanvas.addEventListener("mousedown", handleMouseDown);
            return () => {
                if(drawingCanvas){
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
                };
            }
    }, [isActive, canvasRef, dispatch, objects,]);
    
    return null;
};


export default VisionTool;