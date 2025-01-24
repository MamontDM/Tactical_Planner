import { useEffect, useContext, useRef, useState } from "react";
import CanvasContext from "../../../../contexts/CanvasContext";
import { useObjects } from "../../../../../hooks/useObjects";
import { getCoordinates } from "../../../../../utils/commonHelpers";
import { drawObjects } from "../../../../../factories/CanvasRender";
import ToolSettings from "../../ToolSettings/toolSettings";

const StraightTool = ({ isActive, type}) => {
    console.log('called STRLine tool!')
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const [currentSetting, setCurrentSetting] = useState();

    const pointRef = useRef(null);
    const isDrawing = useRef(false);

    const settingUpdater = (data) => {
        setCurrentSetting(data); 
    }; 

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current && currentSetting) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext();
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = "auto";

            drawingCtx.lineWidth = currentSetting.lineWidth;
            drawingCtx.strokeStyle = currentSetting.color;
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
                drawingCtx.strokeStyle = currentSetting.color;
                drawingCtx.lineWidth = currentSetting.lineWidth;
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
                    color: currentSetting.color,
                    lineWidth: currentSetting.lineWidth,
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
    }, [isActive, canvasRef, drawingCanvasRef, dispatch, clearDrawingCanvas, getCanvasContext, getDrawingCanvasContext, currentSetting, objects]);

    return (
        <ToolSettings type={type} onSettingChange={settingUpdater} />
    );
};

export default StraightTool;

