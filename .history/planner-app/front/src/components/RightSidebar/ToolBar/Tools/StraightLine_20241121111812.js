import React, { useEffect, useContext, useRef } from "react";
import CanvasContext from "../../../contexts/CanvasContext";
import { useObjects } from "../../../../hooks/useObjects";
import { getCoordinates } from "../../../../utils/commonHelpers";
import { drawObjects } from "../../../../factories/CanvasRender";

const StraightTool = ({ isActive }) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const pointRef = useRef(null);
    const isDrawing = useRef(false);

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            console.log('click')
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext();
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = "auto";

            drawingCtx.lineWidth = 2;
            drawingCtx.strokeStyle = "#fff234";
            mainCtx.canvas.style.cursor = "crosshair";

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = { points: [] };

                const { x, y } = getCoordinates(event, drawingCanvasRef.current);
                pointRef.current.points[0] = { x, y };

                clearDrawingCanvas();
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;

                const { x, y } = getCoordinates(event, drawingCanvasRef.current);
                const start = pointRef.current.points[0];

                clearDrawingCanvas();

                drawingCtx.beginPath();
                drawingCtx.moveTo(start.x, start.y);
                drawingCtx.lineTo(x, y);
                drawingCtx.strokeStyle = "grey";
                drawingCtx.lineWidth = 2;
                drawingCtx.stroke();
            };

            const handleMouseUp = (event) => {
                if (!isDrawing.current) return;
                isDrawing.current = false;
              

                const { x, y } = getCoordinates(event, drawingCanvasRef.current);
                pointRef.current.points[1] = { x, y };

                const newObject = {
                    id: Date.now(),
                    type: "tech",
                    points: [...pointRef.current.points],
                    color: drawingCtx.strokeStyle,
                    linewidth: drawingCtx.lineWidth,
                };

                dispatch({ type: "ADD_OBJECT", payload: newObject });
                clearDrawingCanvas();
                redrawMainCanvas();
            };

            drawingCanvasRef.current.addEventListener("mousedown", handleMouseDown);
            drawingCanvasRef.current.addEventListener("mousemove", handleMouseMove);
            drawingCanvasRef.current.addEventListener("mouseup", handleMouseUp);

            return () => {
                drawingCanvasRef.current.removeEventListener("mousedown", handleMouseDown);
                drawingCanvasRef.current.removeEventListener("mousemove", handleMouseMove);
                drawingCanvasRef.current.removeEventListener("mouseup", handleMouseUp);
                mainCtx.canvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [isActive, canvasRef, drawingCanvasRef, dispatch]);

    return null;
};

export default StraightTool;

