import  { useEffect, useContext, useRef, useState } from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import { drawObjects } from '../../../../../factories/CanvasRender';
import { drawArea} from '../../../../../utils/canvasHelpers';
import useToolSettings from '../../../../../store/zustand/Toolbar/toolsettingStore';


const VisionTool = ({ isActive, type}) => {

    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
   const settings = useToolSettings((state) => state.getSettings(type));
   console.log(settings);
    const isDrawing = useRef(false);
    const area = useRef(45);
    const radius = useRef(350);
    const startX = useRef(null);
    const startY = useRef(null);
    const startAngle = useRef(null);
    const endAngle = useRef(null);
    const rotationAngle = useRef(null);

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && settings) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const redefinitionAlpha = settings.color.replace(/rgba\((\d+), (\d+), (\d+), [^)]*\)/, 'rgba($1,$2,$3, 0.15)'); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.canvas.style.cursor = 'crosshair';

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

        const handleMouseDown = (event) => {
            const {x, y} = getCoordinates(event, drawingCanvas);
            isDrawing.current  = true;
            startX.current = x;
            startY.current = y;
            clearDrawingCanvas();
            rotationAngle.current = 0;
            startAngle.current = 0;
            const angleInRadians = (area.current * Math.PI / 180 );
            endAngle.current = startAngle.current + angleInRadians;
            clearDrawingCanvas();
            redrawMainCanvas();
            drawArea(drawingCtx , x, y, radius.current, startAngle.current, endAngle.current, rotationAngle.current, settings.lineWidth, redefinitionAlpha);
        };

            const handleMouseMove = (event) => {
               if(!isDrawing.current) return;
               const {x , y} = getCoordinates(event, drawingCanvas);
               const endX = x;
               const endY = y;
               rotationAngle.current = Math.atan2(endY - startY.current, endX - startX.current);
               clearDrawingCanvas();
               redrawMainCanvas();
               drawArea(drawingCtx , startX.current, startY.current, radius.current, startAngle.current, endAngle.current, rotationAngle.current, settings.lineWidth, redefinitionAlpha)
            };

            const handleMouseUp = () => {
               if(!isDrawing.current) return;
               isDrawing.current = false;

               const newObject = {
                id: Date.now(),
                type: "vision",
                x: startX.current,
                y: startY.current,
                radius: radius.current,
                startAngle: startAngle.current,
                endAngle: endAngle.current,
                rotationAngle: rotationAngle.current,
                strokeWidth: settings.lineWidth,
                fillStyle: redefinitionAlpha,
                };
                dispatch({type: "ADD_OBJECT", payload: newObject});
                clearDrawingCanvas();
                redrawMainCanvas();
            };
            drawingCanvas.addEventListener("mousedown", handleMouseDown);
            drawingCanvas.addEventListener("mousemove", handleMouseMove);
            drawingCanvas.addEventListener("mouseup", handleMouseUp);

            return () => {
                if(drawingCanvas){
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.removeEventListener("mousemove", handleMouseMove);
                drawingCanvas.removeEventListener("mouseup", handleMouseUp);
                }
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [isActive, objects, canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas, settings,  dispatch]);

};

export default VisionTool;
