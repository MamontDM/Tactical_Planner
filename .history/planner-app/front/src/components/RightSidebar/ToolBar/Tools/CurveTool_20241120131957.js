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

    useEffect(() => {
        if (isActive && canvasRef?.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#fff234";
            ctx.canvas.style.cursor = "crosshair";

            const redrawCanvas = () => {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                drawObjects(canvasRef.current, objects);
            };

            function pointStep (x,y) { 
                if(points.lenght === 0) return true;
                const DISTANCE_THRESHOLD = 25;
                const lastPoint = points[points.lenght - 1];
                const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);  
                return distance >= DISTANCE_THRESHOLD;
            };



            const handleMouseDown = (event) =>{
                const {x , y} = getCoordinates(event, canvasRef.current);
                console.log(`Coords: ${x}, ${y}`);
                points.push({ x , y });
                isDrawing = true;
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
};



export default CurveTool;