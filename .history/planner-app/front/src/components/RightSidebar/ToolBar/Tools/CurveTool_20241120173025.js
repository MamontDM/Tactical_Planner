import React, { useEffect, useContext, useRef } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { drawObjects } from '../../../../factories/CanvasRender';
import { curveEndDrawArrow} from '../../../../utils/canvasHelpers';

const CurveTool = ({ isActive }) => {
    const { canvasRef } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const isDrawing = useRef(false);
    const points = useRef([]);
    const temporaryPoints = useRef(null);
    const lineWidth = 2;
    const strokeStyle = "#fff234";

    useEffect(() => {
        if (isActive && canvasRef?.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.canvas.style.cursor = "crosshair";

            const virtualCanvas = document.createElement('canvas');
            virtualCanvas.width = canvasRef.current.width;
            virtualCanvas.height = canvasRef.current.height;
            const virtualCtx = virtualCanvas.getContext('2d');


            const redrawVirtualCanvas = () => {
                virtualCtx.clearRect(0, 0, virtualCanvas.width, virtualCanvas.height);
                drawSmoothCurve(temporaryPoints.current, points.current, lineWidth, strokeStyle, virtualCtx);
            };

            const pointStep = (x, y) => {
                if (points.current.length === 0) return true;
                const lastPoint = points.current[points.current.length - 1];
                const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);
                return distance >= 20;
            };

            const handleMouseDown = (event) => {
                const { x, y } = getCoordinates(event, canvasRef.current);
                points.current.push({ x, y });
                isDrawing.current = true;
            };

            const handleMouseMove = (event) => {
                if (!isDrawing.current) return;
                const { x, y } = getCoordinates(event, canvasRef.current);
                if (pointStep(x, y)) {
                    points.current.push({ x, y });
                }
                temporaryPoints.current = { x, y };
                redrawVirtualCanvas();
                
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

                    curveEndDrawArrow(virtualCtx, fromX, fromY, toX, toY, angle, headLength, lineWidth, strokeStyle);

                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.drawImage(virtualCanvas, 0, 0);
                   
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
                    dispatch({ type: "ADD_OBJECT", payload: newObject });
                    
                    points.current = [];
                }
                temporaryPoints.current = null;
            };

            canvasRef.current.addEventListener("mousedown", handleMouseDown);
            canvasRef.current.addEventListener("mousemove", handleMouseMove);
            canvasRef.current.addEventListener("mouseup", handleMouseUp);

            return () => {
                if(canvasRef.current){
                canvasRef.current.removeEventListener("mousedown", handleMouseDown);
                canvasRef.current.removeEventListener("mousemove", handleMouseMove);
                canvasRef.current.removeEventListener("mouseup", handleMouseUp);
                }
                ctx.canvas.style.cursor = "default";
            };
        }
    }, [isActive, canvasRef, dispatch]);


    const drawSmoothCurve = (temporaryPoint, points, lineWidth, strokeStyle, virtualCtx) => {
        if (!canvasRef.current || points.length < 1) return;
        
        virtualCtx.lineWidth = lineWidth;
        virtualCtx.strokeStyle = strokeStyle;
        virtualCtx.beginPath();
        virtualCtx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            virtualCtx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        const lastPoint = points[points.length - 1];
        const endX = temporaryPoint ? temporaryPoint.x : lastPoint.x;
        const endY = temporaryPoint ? temporaryPoint.y : lastPoint.y;
        virtualCtx.quadraticCurveTo(lastPoint.x, lastPoint.y, endX, endY);
        virtualCtx.stroke();
    };
    
    return null;
};

export default CurveTool;
