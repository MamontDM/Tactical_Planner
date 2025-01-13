import React, { useEffect, useContext, useRef } from 'react';
import { getCoordinates } from '../../../../utils/commonHelpers';
import CanvasContext from '../../../contexts/CanvasContext';
import { useObjects } from '../../../../hooks/useObjects';
import { findClickedObject } from '../../../../utils/commonHelpers';
import CanvasRenderer from '../../../../factories/CanvasRender';

const CurveTool = ({isActive}) => {
    const { canvasRef } = useContext(CanvasContext);
    const { objects, dispatch } = useObjects();
    const pointRef = useRef(null);
    const isDrawing = useRef(false);
    const points = useRef([]); 


    useEffect(() => {
        if (isActive && canvasRef?.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#fff234";
            ctx.canvas.style.cursor = "crosshair";

            const handleMouseDown = (event) =>{
                const {x , y} = getCoordinates(event, canvasRef.current);
                console.log(`Coords: ${x}, ${y}`);
                const points = []; 
                const temporaryPoints = null;
                points.push({ x , y });
                isDrawing = true;
            };

             function pointStep (x,y) { 

                const DISTANCE_THRESHOLD = 25;
                const lastPoint = points[points.lenght - 1];
                const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);  
            };

            const handleMouseMove = (event) =>{
                if(!isDrawing) return
                const {x, y} = getCoordinates(event, canvasRef.current);

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