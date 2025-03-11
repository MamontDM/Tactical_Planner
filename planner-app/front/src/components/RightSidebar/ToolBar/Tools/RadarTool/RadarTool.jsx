import { useEffect, useContext, useRef, useState } from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import { drawCircle } from '../../../../../utils/canvasHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import useToolSettings from '../../../../../store/zustand/Toolbar/toolsettingStore';

const RadarTool = ({isActive, type}) => {
    console.log('called Radar tool!')
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const settings = useToolSettings((state) => state.getSettings(type));

    const scale = useRef(20);
    const points = useRef([]);
    const radius = useRef(null)

   
    const radiusCalculation = () => {
        if(settings.range){
            radius.current = settings.range * scale.current;
        }
    }

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && settings) {
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.lineWidth = settings.lineWidth;
            drawingCtx.strokeStyle = settings.color;
            drawingCtx.canvas.style.cursor = 'crosshair';

            const handleMouseDown = (event) => {
                radiusCalculation();
                    const {x , y} = getCoordinates(event, drawingCanvas);
                    points.current.push({x , y});
                    drawCircle(drawingCtx, x, y, radius.current, settings.lineWidth, settings.color);
                    const newObject = {
                        id: Date.now(),
                        type: "radar",
                        points: [...points.current],
                        radius: radius.current,
                        color: settings.color,
                        lineWidth: settings.lineWidth,
                    };
                    dispatch({ type: "ADD_OBJECT", payload: newObject });
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
    }, [isActive, canvasRef, dispatch, 
        objects, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas, settings
    ]);
};


export default RadarTool;