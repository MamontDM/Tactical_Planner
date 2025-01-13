import React, { useContext, useEffect } from "react";
import CanvasContext from "../../../contexts/CanvasContext";

const StraightTool = ({ isActive }) => {
    const { canvasRef, getCanvasContext } = useContext(CanvasContext);
    const isDrawing = useRef(false);
    const pointRef = useRef(null);

    useEffect(() => {
        if (isActive && canvasRef?.current) {
            const ctx = getCanvasContext();

            // Настройка прозрачного канваса
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#fff234";
            ctx.canvas.style.cursor = "crosshair";

            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = { points: [] };

                const { x, y } = getCoordinates(event, canvasRef.current);
                pointRef.current.points[0] = { x, y };
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;

                const { x, y } = getCoordinates(event, canvasRef.current);
                const start = pointRef.current.points[0];

                // Очищаем текущую временную линию
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

                // Рисуем временную линию
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

                // Отправляем объект в состояние
                dispatch({ type: "ADD_OBJECT", payload: newObject });

                // Очищаем временный слой
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
    }, [isActive, canvasRef, getCanvasContext]);

    return null;
};

export default StraightTool;
