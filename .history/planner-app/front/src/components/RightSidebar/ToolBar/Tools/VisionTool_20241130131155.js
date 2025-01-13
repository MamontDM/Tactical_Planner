import  { useEffect, useContext, useRef } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { drawObjects } from '../../../../factories/CanvasRender';
import { drawArea} from '../../../../utils/canvasHelpers';

const RadarTool = ({ isActive, commonSettings, onChangeCommonSettings }) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const strokeStyle = commonSettings.color;
    const fillStyle = 'rgba(152, 25, 255, 0.11)';
    const isDrawing = useRef(false);
    const area = useRef(45);
    const radius = useRef(350);
    let startX = useRef(null);
    let startY = useRef(null);
    const startAngle = userRef(null);
    const endAngle = userRef(null);
    const rotationAngle = userRef(null);

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';
            drawingCtx.canvas.style.cursor = 'crosshair';

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            

        const handleMouseDown = (event) => {
            const {x, y} = getCoordinates(event, drawingCanvas);
            isDrawing.current  = true;
            startX.current = x;
            startY.current = y;
            clearDrawingCanvas();
            rotationAngle = 0;
            startAngle = 0;
            const angleInRadians = (area.current * Math.PI / 180 );
            endAngle = startAngle + angleInRadians;
            clearDrawingCanvas();
            redrawMainCanvas();
            drawArea(drawingCtx , x, y, radius.current, startAngle, endAngle, rotationAngle, strokeStyle, fillStyle)
        };

            const handleMouseMove = (event) => {
               if(!isDrawing.current) return;
               const {x , y} = getCoordinates(event, drawingCanvas);
               const endX = x;
               const endY = y;
               rotationAngle = Math.atan2(endY - startY.current, endX - startX.current);
               clearDrawingCanvas();
               redrawMainCanvas();
               drawArea(drawingCtx , startX.current, startY.current, radius.current, startAngle, endAngle, rotationAngle, strokeStyle, fillStyle)
            };

            const handleMouseUp = () => {
               if(!isDrawing.current) return;
               isDrawing.current = false;

               const newObject = {
                id: Date.now(),
                type: "vision",
                x: startX.current,
                y: startY.current,
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

export default RadarTool;
