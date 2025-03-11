import { useEffect, useContext, useRef, useState } from 'react';
import { getCoordinates } from '../../../../../utils/commonHelpers';
import { drawCircle, setAlphaChannel } from '../../../../../utils/canvasHelpers';
import CanvasContext from '../../../../contexts/CanvasContext';
import { useObjects } from '../../../../../hooks/useObjects';
import useToolSettings from '../../../../../store/zustand/Toolbar/toolsettingStore';

const BaseAreaTool = ({isActive, type}) => {
    console.log('called Base Area tool!')
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const {objects,  dispatch } = useObjects();
    const settings = useToolSettings((state) => state.getSettings(type));
    const scale = useRef(20);
    const points = useRef([]);
    const radius = useRef(null);
    const startX = useRef(null);
    const startY = useRef(null);
    const isCalculatingRadius = useRef(false);
    const colorWithAlpha = useRef(null ||'rgba(136, 255, 0, 1');

    const calculateRadius = (moveX , moveY) => {
           return radius.current = Math.sqrt(((moveX - startX.current) ** 2) + ((moveY - startY.current) ** 2));
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
                    const {x , y} = getCoordinates(event, drawingCanvas);
                    startX.current = x;
                    startY.current = y;
                    points.current.push({x , y});
                    isCalculatingRadius.current = true;
            };


            const handleOnMouseMove = (event) => {
                if(!isCalculatingRadius.current){
                    return;
                }
                const {x , y} = getCoordinates(event, drawingCanvas);
                clearDrawingCanvas();
                calculateRadius(x, y);
                colorWithAlpha.current = setAlphaChannel(settings.color);
                drawCircle(drawingCtx, startX.current, startY.current, radius.current, colorWithAlpha.current, settings.lineWidth, settings.textBody, settings.fontSize);
            };

            
            const handleOnMouseUp = (event) => {
                isCalculatingRadius.current = false;
                const newObject = {
                    id: Date.now(),
                    type: "base",
                    points: [...points.current],
                    radius: radius.current,
                    color: colorWithAlpha.current,
                    lineWidth: settings.lineWidth,
                    textBody: settings.textBody,
                    fontSize: settings.fontSize,
                };
                console.log(newObject);
                dispatch({ type: "ADD_OBJECT", payload: newObject });
                points.current = [];
                clearDrawingCanvas();
            }; 



        drawingCanvas.addEventListener("mousedown", handleMouseDown);
        drawingCanvas.addEventListener('mousemove', handleOnMouseMove );
        drawingCanvas.addEventListener("mouseup", handleOnMouseUp);

            return () => {
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.removeEventListener('mousemove', handleOnMouseMove )
                drawingCanvas.removeEventListener("mouseup", handleOnMouseUp);
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            }
        }
    }, [isActive, canvasRef, dispatch, 
        objects, drawingCanvasRef, getCanvasContext, 
        getDrawingCanvasContext, clearDrawingCanvas,settings
    ]);

    return null;
};


export default BaseAreaTool;