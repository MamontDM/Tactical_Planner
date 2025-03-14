import { useEffect, useContext, useRef, useState } from "react";
import CanvasContext from "../../../../contexts/CanvasContext";
import { getCoordinates } from "../../../../../utils/commonHelpers";
import { drawObjects } from "../../../../../factories/CanvasRender";
import useToolSettings from '../../../../../store/zustand/Toolbar/toolsettingStore';
import { useMapStore } from "../../../../../store/zustand/MapStore/mapStore";
import {pixelsToKilometers} from "../../../../../utils/mapScale";

const StraightTool = ({ isActive, type}) => {
    console.log('called STRLine tool!')
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);

    const settings = useToolSettings((state) => state.getSettings(type));
    const addObject = useMapStore((state) => state.addObject);
    const getMapSize = useMapStore((state) => state.getMapSize);
    const mapSize = getMapSize();

    const pointRef = useRef(null);
    const distance = useRef(null);
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
                const midX = (start.x + x) / 2;
                const midY = (start.y + y) / 2;
                
                const dx = x - start.x;
                const dy = y - start.y;
                const lengthPixels = Math.sqrt(dx * dx + dy * dy);

             
                const { xKm, yKm } = pixelsToKilometers(lengthPixels, 0, mapSize);
                const distanceKm = xKm.toFixed(2);
                distance.current = distanceKm;

                drawingCtx.beginPath();
                drawingCtx.moveTo(start.x, start.y);
                drawingCtx.lineTo(x, y);
                drawingCtx.strokeStyle = settings.color;
                drawingCtx.lineWidth = settings.lineWidth;
                drawingCtx.stroke();

                const textOffsetY = -10;

                drawingCtx.font = "14px Arial";
                drawingCtx.fillStyle = settings.color;
                drawingCtx.textAlign = "center";
                drawingCtx.textBaseline = "bottom";
                drawingCtx.fillText(`${distanceKm} км`, midX, midY + textOffsetY);
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
                    distanceKm: distance.current,
                };
                console.log(newObject);
                distance.current = null;
                addObject(newObject);
                clearDrawingCanvas();
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
    }, [isActive, canvasRef, drawingCanvasRef, clearDrawingCanvas, getCanvasContext, settings, getDrawingCanvasContext, mapSize]);
    
};

export default StraightTool;

