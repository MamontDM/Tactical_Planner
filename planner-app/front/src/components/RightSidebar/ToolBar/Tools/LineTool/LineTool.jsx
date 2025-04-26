import  { useEffect, useRef, useContext, useState} from 'react';
import { getCoordinates } from "../../../../../utils/commonHelpers";
import CanvasContext from "../../../../contexts/CanvasContext";
import {useToolSettings} from "@/store/zustand/Toolbar/toolsettingStore";
import { useMapStore } from  "@/store/zustand/MapStore/mapStore";


const LineTool = ({isActive, type}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const settings = useToolSettings((state) => state.getSettings(type));
    const addObject = useMapStore((state) => state.addObject);

    const isDrawing = useRef(false);
    const pointRef = useRef([]);

    const settingUpdater = (data) => {
        setsettings(data); 
    };    


    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && settings) {
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.canvas.style.cursor = 'crosshair';
            drawingCtx.lineWidth = settings.lineWidth;
            drawingCtx.strokeStyle = settings.color;


            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = [];
                const { x, y } = getCoordinates(event, drawingCanvas);
                pointRef.current.push({x , y});
                drawingCtx.beginPath();
                drawingCtx.moveTo(x , y);
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
                pointRef.current.push({x , y});
                drawingCtx.lineTo( Math.round(x), Math.round(y));
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
                        lineWidth: settings.lineWidth,
                        color: settings.color,
                    };
                    addObject(newObject);
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
    }, [isActive, canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas, settings]);
   
};
export default LineTool;