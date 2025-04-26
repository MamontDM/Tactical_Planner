import { useContext,useEffect, useState} from 'react';
import CanvasContext from '../../../../contexts/CanvasContext';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import { getTextSize } from '../../../../../utils/canvasHelpers';
import {useToolSettings} from '@/store/zustand/Toolbar/toolsettingStore';
import { useMapStore } from "@/store/zustand/MapStore/mapStore";

const TextTool = ({isActive, type}) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const addObject = useMapStore((state) => state.addObject);
    const settings = useToolSettings((state) => state.getSettings(type));

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && settings) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.canvas.style.cursor = 'crosshair';
            const textBody = settings.textBody;
            const fontSize = settings.fontSize;
            const textColor = settings.color;

const handleClick = (event) => {
    const {x , y} = getCoordinates(event, drawingCanvas);
    const textWidth = getTextSize(drawingCtx, fontSize, 'Arial')

const newObject = { 
        id: Date.now(),
        type: 'text',
        textBody: textBody,
        x: x,
        y: y,
        width: textWidth,
        fontSize: fontSize,
        textColor: textColor,
    };
    addObject(newObject);
    clearDrawingCanvas();
};
            
            drawingCanvas.addEventListener("click", handleClick);

            return () => {
                if(drawingCanvas){
                drawingCanvas.removeEventListener("click", handleClick);
                }
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [ isActive, canvasRef, drawingCanvasRef, getCanvasContext, settings,
        getDrawingCanvasContext, clearDrawingCanvas]);

};


export default TextTool;