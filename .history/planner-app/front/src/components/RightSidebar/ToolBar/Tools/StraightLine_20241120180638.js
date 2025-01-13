import React, { useEffect, useContext, useRef } from "react";
import CanvasContext from "../../../contexts/CanvasContext";
import { useObjects } from "../../../../hooks/useObjects";
import { getCoordinates } from "../../../../utils/commonHelpers";
import { drawObjects } from "../../../../factories/CanvasRender";

const StraightTool = ({ isActive }) => {
    const { canvasRef, virtualCanvasRef } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const pointRef = useRef(null);
    const isDrawing = useRef(false);

    useEffect(() => {
        if (isActive && canvasRef?.current && virtualCanvasRef?.current) {
            const mainCtx = canvasRef.current.getContext("2d");
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#fff234";
            ctx.canvas.style.cursor = "crosshair";

            const redrawCanvas = () => {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = { points: [] };

                const { x, y } = getCoordinates(event, canvasRef.current);
                pointRef.current.points[0] = { x, y };

                redrawCanvas();
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;

                const { x, y } = getCoordinates(event, canvasRef.current);
                const start = pointRef.current.points[0];

                redrawCanvas();
                ctx.beginPath();
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(x, y);
                ctx.strokeStyle = "grey";
                ctx.lineWidth = 2;
                ctx.stroke();
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
                    color: ctx.strokeStyle,
                    linewidth: ctx.lineWidth,
                };

                dispatch({ type: "ADD_OBJECT", payload: newObject });
                redrawCanvas();
            };

            canvasRef.current.addEventListener("mousedown", handleMouseDown);
            canvasRef.current.addEventListener("mousemove", handleMouseMove);
            canvasRef.current.addEventListener("mouseup", handleMouseUp);

            return () => {
                canvasRef.current.removeEventListener("mousedown", handleMouseDown);
                canvasRef.current.removeEventListener("mousemove", handleMouseMove);
                canvasRef.current.removeEventListener("mouseup", handleMouseUp);
                ctx.canvas.style.cursor = "default";
            };
        }
    }, [isActive, canvasRef, dispatch]);

    return null;
};

export default StraightTool;
