import { useEffect, useContext, useRef } from "react";
import CanvasContext from "../../../contexts/CanvasContext";
import { useObjects } from "../../../../hooks/useObjects";
import { getCoordinates } from "../../../../utils/commonHelpers";
import { drawObjects } from "../../../../factories/CanvasRender";

const StraightTool = ({ isActive, commonSettings, onChangeCommonSettings }) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const pointRef = useRef(null);
    const isDrawing = useRef(false);
    const lineWidth = commonSettings.lineWidth;
    const strokeStyle = commonSettings.color;

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            console.log('click')
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext();
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = "auto";

            drawingCtx.lineWidth = lineWidth.current;
            drawingCtx.strokeStyle = strokeStyle.current;
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
                drawingCtx.strokeStyle = strokeStyle;
                drawingCtx.lineWidth = lineWidth;
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
                    color: strokeStyle,
                    lineWidth: lineWidth,
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
    }, [isActive, canvasRef, drawingCanvasRef, dispatch,
        
    ]);

    return null;
};

export default StraightTool;

