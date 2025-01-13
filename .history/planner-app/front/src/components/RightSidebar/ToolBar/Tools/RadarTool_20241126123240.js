import  { useEffect, useContext, useRef } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { drawObjects } from '../../../../factories/CanvasRender';
import { drawArea} from '../../../../utils/canvasHelpers';

const RadarTool = ({ isActive }) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const lineWidth = 2;
    const strokeStyle = "#fff234";
    const fillStyle = 'rgba(152, 219, 255, 0.11)';
    const isDrawing = useRef(null);
    const area = useRef(150);
    const radius = useRef(80);
    const startX = null;
    const startY = null;
    const startAngle = null;
    const endAngle = null;
    const rotationAngle = null;

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            const isDrawing = false;
            drawingCanvas.style.pointerEvents = 'auto';

            drawingCtx.canvas.style.cursor = 'crosshair';

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            

        const handleMouseDown = (event) => {
            const {x, y} = getCoordinates(event, drawingCanvas);
            isDrawing.current = true;
            startX = x;
            startY = y;
            clearDrawingCanvas();
            rotationAngle = 0;
            startAngle = 0;
            const angleInRadians = (area.current * Math.PI / 180 );
            endAngle= startAngle + angleInRadians;
            clearDrawingCanvas();
            redrawMainCanvas();
            drawArea (drawingCtx , x, y, radius.current, startAngle, endAngle, rotationAngle, strokeStyle, fillStyle)
        };

            const handleMouseMove = (event) => {
               if(!isDrawing.current) return;
               const {x , y} = getCoordinates(event, drawingCanvas);
               const endX = x;
               const endY = y;
               rotationAngle = Math.atan2(endY - startY, endX - startX);
               clearDrawingCanvas();
               redrawMainCanvas();
               drawArea(drawingCtx , x, y, radius.current, startAngle, endAngle, rotationAngle, strokeStyle, fillStyle)
            };

            const handleMouseUp = () => {
               if(!isDrawing.current) return;
               isDrawing.current = false;

               const newObject = {
                id: Date.now(),
                type: "area",
                x: startX,
                y: startY,
                radius: radius.current,
                startAngle: startAngle,
                endAngle: endAngle,
                rotationAngle: rotationAngle,
                strokeStyle: strokeStyle,
                fillStyle:fillStyle,
                color: strokeStyle,
                };

                dispatch({ type: "ADD_OBJECT", payload: newObject });
                clearDrawingCanvas();
                redrawMainCanvas();
            };
            drawingCanvas.addEventListener("mousedown", handleMouseDown);
            drawingCanvas.addEventListener("mousemove", handleMouseMove);
            drawingCanvas.addEventListener("mouseup", handleMouseUp);

            return () => {
                if(drawingCanvas){
                drawingCanvas.removeEventListener("mousedown", handleMouseDown);
                drawingCanvas.removeEventListener("mousemove", handleMouseMove);
                drawingCanvas.removeEventListener("mouseup", handleMouseUp);
                }
                drawingCanvas.style.cursor = "default";
                drawingCanvas.style.pointerEvents = "none";
            };
        }
    }, [isActive, canvasRef, drawingCanvasRef, objects]);

    return null;
};

export default CurveTool;
