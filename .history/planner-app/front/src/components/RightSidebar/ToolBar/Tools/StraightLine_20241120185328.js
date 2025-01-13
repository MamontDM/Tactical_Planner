import React, { useEffect, useContext, useRef } from "react";
import CanvasContext from "../../../contexts/CanvasContext";
import { useObjects } from "../../../../hooks/useObjects";
import { getCoordinates } from "../../../../utils/commonHelpers";
import { drawObjects } from "../../../../factories/CanvasRender";

const StraightTool = ({ isActive }) => {
    const {  canvasRef, drawingCanvasRef, getCanvasContext } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const pointRef = useRef(null);
    const isDrawing = useRef(false);

    useEffect(() => {
        if (isActive && canvasRef?.current && virtualCanvasRef?.current) {
            const mainCtx = getCanvasContext();
            const virtualCtx = getVirtualCanvasContext();
            
            virtualCtx.lineWidth = 2;
            virtualCtx.strokeStyle = "#fff234";
            mainCtx.canvas.style.cursor = "crosshair";
            clearVirtualCanvas();

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };


            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = { points: [] };

                const { x, y } = getCoordinates(event, canvasRef.current);
                pointRef.current.points[0] = { x, y };
          
                clearVirtualCanvas();
            };

            const handleMouseMove = (event) => {
                if(!isDrawing.current) return;

                const { x, y } = getCoordinates(event, canvasRef.current);
                const start = pointRef.current.points[0];

                clearVirtualCanvas();

                const tempObject = {
                    type: "temp", 
                    points: [start, { x, y }],
                    color: "grey",
                    linewidth: 2,
                };

                virtualCtx.beginPath();
                virtualCtx.moveTo(start.x, start.y);
                virtualCtx.lineTo(x, y);
                virtualCtx.strokeStyle = tempObject.color;
                virtualCtx.lineWidth = tempObject.linewidth;
                virtualCtx.stroke();

                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, [...objects, tem]); 

                mainCtx.drawImage(virtualCanvasRef.current, 0, 0);
            };

            const handleMouseUp = (event) => {
                if (!isDrawing.current) return;
                isDrawing.current = false;

                const { x, y } = getCoordinates(event, canvasRef.current);
                pointRef.current.points[1] = { x, y };

                const newObject = {
                    id: Date.now(),
                    type: "tech",
                    points: [...pointRef.current.points],
                    color: virtualCtx.strokeStyle,
                    linewidth: virtualCtx.lineWidth,
                };

                dispatch({ type: "ADD_OBJECT", payload: newObject });
                clearVirtualCanvas();
                redrawMainCanvas();
            };

            canvasRef.current.addEventListener("mousedown", handleMouseDown);
            canvasRef.current.addEventListener("mousemove", handleMouseMove);
            canvasRef.current.addEventListener("mouseup", handleMouseUp);

            return () => {
                canvasRef.current.removeEventListener("mousedown", handleMouseDown);
                canvasRef.current.removeEventListener("mousemove", handleMouseMove);
                canvasRef.current.removeEventListener("mouseup", handleMouseUp);
                mainCtx.canvas.style.cursor = "default";
            };
        }
    }, [isActive, canvasRef, virtualCanvasRef, dispatch]);

    return null;
};

export default StraightTool;
