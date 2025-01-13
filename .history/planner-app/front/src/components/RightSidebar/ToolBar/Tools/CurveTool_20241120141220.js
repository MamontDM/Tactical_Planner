import React, { useEffect, useContext, useRef } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { drawObjects } from '../../../../factories/CanvasRender';
import { curveAddDrowArrow} from '../../../../utils/canvasHelpers';

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

            const redrawCanvas = () => {
                if (!canvasRef.current) return;
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            const pointStep = (x, y) => {
                if (points.current.length === 0) return true;
                const lastPoint = points.current[points.current.length - 1];
                const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);
                return distance >= 25;
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
                redrawCanvas();
                drawSmoothCurve(temporaryPoints.current, points.current, lineWidth, strokeStyle);
            };

            const handleMouseUp = () => {
                isDrawing.current = false;

                if (points.current.length > 1) {
                    const lastIndex = points.current.length - 1;
                    const fromX = points.current[lastIndex - 1].x;
                    const fromY = points.current[lastIndex - 1].y;
                    const toX = points.current[lastIndex].x;
                    const toY = points.current[lastIndex].y;
                    const angle = Math.atan2(toY - fromY, toX - fromX);
                    curveAddDrawArrow(fromX, fromY, toX, toY, angle, lineWidth, strokeStyle);
                   
                    const newObject = {
                        id: Date.now(),
                        type: "curve",
                        points: [...points.current],
                        color: ctx.strokeStyle,
                        linewidth: ctx.lineWidth,
                        arrow: {
                            fromX,
                            fromY,
                            toX,
                            toY,
                            angle,
                            headLength: 20,
                        },
                    };
                    dispatch({ type: "ADD_OBJECT", payload: newObject });
                    
                    points.current = [];
                    redrawCanvas();
                }
                temporaryPoints.current = null;
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
    }, [isActive, canvasRef, objects]);

    const drawSmoothCurve = (temporaryPoint, points, lineWidth, strokeStyle) => {
        if (!canvasRef.current || points.length < 1) return;
        const ctx = canvasRef.current.getContext("2d");
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
