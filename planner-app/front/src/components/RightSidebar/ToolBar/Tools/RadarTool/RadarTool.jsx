import { useEffect, useContext, useRef, useState } from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import { drawCircle } from '../../../../../utils/canvasHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import {useToolSettings} from '@/store/zustand/Toolbar/toolsettingStore';
import { useMapStore } from  "@/store/zustand/MapStore/mapStore";

const RadarTool = ({isActive, type}) => {
    console.log('called Radar tool!')
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const settings = useToolSettings((state) => state.getSettings(type));
    const addObject = useMapStore((state) => state.addObject);
    const points = useRef([]);

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && settings) {
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.lineWidth = settings.lineWidth;
            drawingCtx.strokeStyle = settings.color;
            drawingCtx.canvas.style.cursor = 'crosshair';

            const handleMouseDown = (event) => {
                    const {x , y} = getCoordinates(event, drawingCanvas);
                    points.current.push({x , y});
                    console.log(settings.range)
                    drawCircle(drawingCtx, x, y, settings.range, settings.lineWidth, settings.color);
                    const newObject = {
                        id: Date.now(),
                        type: "radar",
                        points: [...points.current],
                        radius: settings.range,
                        color: settings.color,
                        lineWidth: settings.lineWidth,
                    };
                    addObject(newObject);
                    points.current = [];
                    clearDrawingCanvas();
                }


        drawingCanvas.addEventListener("mousedown", handleMouseDown);

            return () => {
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            }
        }
    }, [isActive, canvasRef, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas, settings
    ]);
};


export default RadarTool;