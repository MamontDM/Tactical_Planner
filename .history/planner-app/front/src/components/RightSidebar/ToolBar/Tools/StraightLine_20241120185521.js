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
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext();

            drawingCtx.lineWidth = 2;
            drawingCtx.strokeStyle = "#fff234";
            mainCtx.canvas.style.cursor = "crosshair";

            // Перерисовка основного канваса
            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            // Начало рисования
            const handleMouseDown = (event) => {
                isDrawing.current = true;
                pointRef.current = { points: [] };

                const { x, y } = getCoordinates(event, drawingCanvasRef.current);
                pointRef.current.points[0] = { x, y };

                clearDrawingCanvas();
            };

            // Временное рисование на `drawingCanvas`
            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;

                const { x, y } = getCoordinates(event, drawingCanvasRef.current);
                const start = pointRef.current.points[0];

                // Очистка временного канваса
                clearDrawingCanvas();

                // Рисуем временную линию
                drawingCtx.beginPath();
                drawingCtx.moveTo(start.x, start.y);
                drawingCtx.lineTo(x, y);
                drawingCtx.strokeStyle = "grey"; // Временный цвет
                drawingCtx.lineWidth = 2;
                drawingCtx.stroke();
            };

            // Завершение рисования
            const handleMouseUp = (event) => {
                if (!isDrawing.current) return;
                isDrawing.current = false;

                const { x, y } = getCoordinates(event, drawingCanvasRef.current);
                pointRef.current.points[1] = { x, y };

                // Создаем новый объект
                const newObject = {
                    id: Date.now(),
                    type: "tech",
                    points: [...pointRef.current.points],
                    color: drawingCtx.strokeStyle,
                    linewidth: drawingCtx.lineWidth,
                };

                // Добавляем объект в состояние
                dispatch({ type: "ADD_OBJECT", payload: newObject });

                // Очистка временного канваса и обновление основного
                clearDrawingCanvas();
                redrawMainCanvas();
            };

            // Подключаем обработчики событий
            drawingCanvasRef.current.addEventListener("mousedown", handleMouseDown);
            drawingCanvasRef.current.addEventListener("mousemove", handleMouseMove);
            drawingCanvasRef.current.addEventListener("mouseup", handleMouseUp);

            return () => {
                // Отключаем обработчики событий
                drawingCanvasRef.current.removeEventListener("mousedown", handleMouseDown);
                drawingCanvasRef.current.removeEventListener("mousemove", handleMouseMove);
                drawingCanvasRef.current.removeEventListener("mouseup", handleMouseUp);
                mainCtx.canvas.style.cursor = "default";
            };
        }
    }, [isActive, canvasRef, drawingCanvasRef, dispatch]);

    return null;
};

export default StraightTool;

