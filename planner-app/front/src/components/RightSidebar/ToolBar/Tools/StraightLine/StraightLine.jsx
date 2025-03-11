import { useEffect, useContext, useRef, useState } from "react";
import CanvasContext from "../../../../contexts/CanvasContext";
import { useObjects } from "../../../../../hooks/useObjects";
import { getCoordinates } from "../../../../../utils/commonHelpers";
import { drawObjects } from "../../../../../factories/CanvasRender";
import useToolSettings from '../../../../../store/zustand/Toolbar/toolsettingStore';

const StraightTool = ({ isActive, type}) => {
    console.log('called STRLine tool!')
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const settings = useToolSettings((state) => state.getSettings(type));

    const pointRef = useRef(null);
    const isDrawing = useRef(false);


    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && settings) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext();
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = "auto";

            drawingCtx.lineWidth = settings.lineWidth;
            drawingCtx.strokeStyle = settings.color;
            drawingCtx.canvas.style.cursor = "crosshair";

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = { points: [] };
                const { x, y } = getCoordinates(event, drawingCanvas);
                pointRef.current.points[0] = { x, y };
                clearDrawingCanvas();
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
                const start = pointRef.current.points[0];

                clearDrawingCanvas();

                drawingCtx.beginPath();
                drawingCtx.moveTo(start.x, start.y);
                drawingCtx.lineTo(x, y);
                drawingCtx.strokeStyle = settings.color;
                drawingCtx.lineWidth = settings.lineWidth;
                drawingCtx.stroke();
            };

            const handleMouseUp = (event) => {
                if (!isDrawing.current) return;
                isDrawing.current = false;
              

                const { x, y } = getCoordinates(event, drawingCanvas);
                pointRef.current.points[1] = { x, y };

                const newObject = {
                    id: Date.now(),
                    type: "tech",
                    points: [...pointRef.current.points],
                    color: settings.color,
                    lineWidth: settings.lineWidth,
                };
                console.log(newObject);
                dispatch({ type: "ADD_OBJECT", payload: newObject });
                clearDrawingCanvas();
                redrawMainCanvas();
            };

            drawingCanvas.addEventListener("mousedown", handleMouseDown);
            drawingCanvas.addEventListener("mousemove", handleMouseMove);
            drawingCanvas.addEventListener("mouseup", handleMouseUp);

            return () => {
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.removeEventListener("mousemove", handleMouseMove);
                drawingCanvas.removeEventListener("mouseup", handleMouseUp);
                mainCtx.canvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [isActive, canvasRef, drawingCanvasRef, dispatch, clearDrawingCanvas, getCanvasContext, settings, getDrawingCanvasContext, objects]);

};

export default StraightTool;

