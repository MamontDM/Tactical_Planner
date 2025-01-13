import React, { useEffect, useContext, useRef } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { drawObjects } from '../../../../factories/CanvasRender';
import { curveEndDrawArrow} from '../../../../utils/canvasHelpers';

const CurveTool = ({ isActive }) => {
    const { canvasRef, drawingCanvasRef, getCanvasContext, getDrawingCanvasContext, clearDrawingCanvas } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const isDrawing = useRef(false);
    const points = useRef([]);
    const temporaryPoints = useRef(null);
    const lineWidth = 15;
    const strokeStyle = "#fff234";

    useEffect(() => {
        if (isActive && canvasRef?.current && drawingCanvasRef?.current) {
            const mainCtx = getCanvasContext();
            const drawingCtx = getDrawingCanvasContext(); 
            const drawingCanvas = drawingCanvasRef.current;
            drawingCanvas.style.pointerEvents = 'auto';

            drawingCtx.lineWidth = lineWidth.current;
            drawingCtx.strokeStyle = strokeStyle.current;
            drawingCtx.canvas.style.cursor = 'crosshair';

            const redrawMainCanvas = () => {
                mainCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            const pointStep = (x, y) => {
                if (points.current.length === 0) return true;
                const lastPoint = points.current[points.current.length - 1];
                const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);
                return distance >= 20;
            };

            const handleMouseDown = (event) => {
                const { x, y } = getCoordinates(event, drawingCanvas);
                points.current.push({ x, y });
                isDrawing.current = true;
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, drawingCanvas);
                if (pointStep(x, y)) {
                    points.current.push({ x, y });
                }
                temporaryPoints.current = { x, y };
                clearDrawingCanvas();

                drawSmoothCurve(temporaryPoints.current, points.current, lineWidth, strokeStyle, drawingCtx);
                
                
            };

            const handleMouseUp = () => {
                isDrawing.current = false;

                if (points.current.length > 1) {
                    const headLength = 10;
                    const lastIndex = points.current.length - 1;
                    const fromX = points.current[lastIndex - 1].x;
                    const fromY = points.current[lastIndex - 1].y;
                    const toX = points.current[lastIndex].x;
                    const toY = points.current[lastIndex].y;
                    const angle = Math.atan2(toY - fromY, toX - fromX);
                    console.log(lineWidth, strokeStyle);
                    curveEndDrawArrow(drawingCtx, fromX, fromY, toX, toY, angle, headLength, lineWidth, strokeStyle);

                   
                    const newObject = {
                        id: Date.now(),
                        type: "curve",
                        points: [...points.current],
                        color: strokeStyle,
                        linewidth: lineWidth,
                        arrow: {
                            fromX,
                            fromY,
                            toX,
                            toY,
                            angle,
                            headLength,
                        },
                    };
                    console.log(newObject);
                    dispatch({ type: "ADD_OBJECT", payload: newObject });
                    
                    points.current = [];
                }
                temporaryPoints.current = null;
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
    }, [isActive, canvasRef, dispatch]);


    const drawSmoothCurve = (temporaryPoint, points, lineWidth, strokeStyle, ctx) => {
        if (!canvasRef.current || points.length < 1) return;
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        const lastPoint = points[points.length - 1];
        const endX = temporaryPoint ? temporaryPoint.x : lastPoint.x;
        const endY = temporaryPoint ? temporaryPoint.y : lastPoint.y;
        ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, endX, endY);
        ctx.stroke();
    };
    
    return null;
};

export default CurveTool;
