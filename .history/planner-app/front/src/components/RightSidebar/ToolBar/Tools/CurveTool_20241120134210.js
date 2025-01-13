import React, { useEffect, useContext, useRef } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';
import {drawObjects} from '../../../../factories/CanvasRender';

const CurveTool = ({isActive}) => {
    const { canvasRef } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const pointRef = useRef(null);
    const isDrawing = useRef(false);
    const points = useRef([]); 
    const temporaryPoints = useRef(null);
    const lineWidth = useRef(2);
    const strokeStyle = useRef("#fff234");

    useEffect(() => {
        if (isActive && canvasRef?.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.canvas.style.cursor = "crosshair";

            const redrawCanvas = () => {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            function pointStep (x , y) { 
                console.log(x,y);
                if(points.current.length === 0) return true;
                const DISTANCE_THRESHOLD = 25;
                const lastPoint = points[points.length - 1];
                const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);  
                return distance >= DISTANCE_THRESHOLD;
            };



            const handleMouseDown = (event) =>{
                const {x , y} = getCoordinates(event, canvasRef.current);
                console.log(`Coords: ${x}, ${y}`);
                points.current.push({ x , y });
                isDrawing,current = true;
            };

            const handleMouseMove = (event) =>{
                if(!isDrawing) return
                const {x, y} = getCoordinates(event, canvasRef.current);
                if(pointStep( x , y )){
                    points.push({x, y});
                }
                temporaryPoints = { x , y };
                redrawCanvas();
                drawSmoothCurve(temporaryPoints, points, lineWidth, strokeStyle );
            };
            const handleMouseUp = () =>{
                if (this.isDrawing && points.length > 1) {
                    const lastIndex = points.length - 1;
                    const fromX = points[lastIndex - 1].x;
                    const fromY = points[lastIndex - 1].y;
                    const toX = points[lastIndex].x;
                    const toY = points[lastIndex].y;
                    const angle = Math.atan2(toY - fromY, toX - fromX);  
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
    }, [isActive]);


    function drawSmoothCurve (temporaryPoints, points, lineWidth, strokeStyle){
        const ctx = canvasRef.current.getContext("2d");
        if(points.length < 1) return;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
            for(let i =  1; i < points.length -1; i++){
                const xc = (points[i].x + points[i + 1].x) / 2;
                const xy = (points[i].x + points[i + 1].x) / 2;
                ctx.quadraticCurveTo(points[i].x, points[i].y, xc, xy); 
            }
            const i = points.length - 1;
            let endX = points[i].x;
            let endY = points[i].y;

            if(temporaryPoints){
                endX = temporaryPoints.x;
                endY = temporaryPoints.y;
            }
            ctx.quadraticCurveTo(points[i].x, points[i].y, endX, endY);
            ctx.stroke();

            const fromX = points[i - 1].x;
            const fromY = points[i - 1].y;
            const finalAngle = Math.atan2(endY - points[i - 1].y, endX - points[i - 1].x);
            drowArrow(fromX, fromY, endX, endY, finalAngle);
    }
    function drowArrow(fromX, fromY, toX, toY, angle){
        const ctx = canvasRef.current.getContext("2d");
        const headlen = 10;
        ctx.beginPath();
        ctx.context.moveTo(toX, toY);
        ctx.context.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.context.moveTo(toX, toY);
        ctx.context.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.context.stroke();
    }
};




export default CurveTool;